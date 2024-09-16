import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button, View, Alert, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { DatabaseModule } = NativeModules

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Can't read "then" prop of undefined
    let response;

    try {
        response = await DatabaseModule.login(username, password);
        response = JSON.parse(response);
        console.log(response);
    } catch (error) {
        console.error(error)
    }


    if (response !== null) {
        await AsyncStorage.setItem("user", JSON.stringify(response));
    } else {
        console.error("Invalid username or password");
    }

}
  return (
    
    <SafeAreaView style={styles.container}>
    
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          title='Login'
          color={"#3346ff"}
          onPress={handleLogin}
        />

        {/* Don't have an account */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => Alert.alert('Sign Up pressed')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                    
    justifyContent: 'center',    
    alignItems: 'center',        
  },
  form: {
    width: '80%',                
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  forgotPassword: {
    color: '#3346ff',
    textAlign: 'center',         
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    color: '#3346ff',
  },
});

export default Login;
