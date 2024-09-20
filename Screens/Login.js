import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext'; 

const { DatabaseModule } = NativeModules;

const Login = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let response;

    try {
      response = await DatabaseModule.login(username, password);
      response = JSON.parse(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    if (response !== null) {
      await AsyncStorage.setItem("user", JSON.stringify(response));
      navigation.navigate("Landing Page")
    } else {
      console.error("Invalid username or password");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Download.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.container]}>
        <View style={styles.form}>
          <TextInput
            style={[styles.input, { color: '#fff' }]} 
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="#fff" 
          />
          <TextInput
            style={[styles.input, { color: '#fff' }]} 
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#fff" 
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Don't have an account */}
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, { color: '#fff' }]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={[styles.signupLink, { color: '#ccd1d1' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    borderColor: 'transparent', 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: 10,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'transparent', 
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: 'red',
    fontSize: 16,
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
  },
});

export default Login;
