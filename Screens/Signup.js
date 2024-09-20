import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Alert, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { NativeModules } from 'react-native';

const { DatabaseModule } = NativeModules;

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidPassword = () => {
    const conditions = {
      length: password.length >= 8 && password.length <= 64,
      validChars: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]*$/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      match: password === confirmPassword,
    };

    const messages = {
      length: "Password must be between 8 and 64 characters long",
      validChars: "Password must only include letters, numbers, special characters, and spaces",
      lowercase: "Password must include at least one lowercase letter",
      uppercase: "Password must include at least one uppercase letter",
      number: "Password must include at least one number",
      specialChar: "Password must include at least one special character",
      match: "Passwords do not match",
    };

    for (const [key, isValid] of Object.entries(conditions)) {
      if (!isValid) {
        Alert.alert("Error", messages[key]);
        return false;
      }
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!isValidPassword()) {
      return;
    }

    const foundUser = await DatabaseModule.getUserByUsername(username);
    if (foundUser) {
      Alert.alert('Username already exists');
      return;
    }

    await DatabaseModule.insertUser(username, password, []);
    Alert.alert('Sign Up Successful');
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require('../assets/Download.png')} // Add your background image here
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Change text color to white
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="#fff" // Change placeholder text color to white
          />
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Change text color to white
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#fff" // Change placeholder text color to white
          />
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Change text color to white
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#fff" // Change placeholder text color to white
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: '#fff' }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.loginLink, { color: '#ccd1d1' }]}>Log In</Text>
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
    borderColor: 'transparent', // Make border transparent
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Make background of input semi-transparent
    padding: 10,
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: 'red', // Red border
    backgroundColor: 'transparent', // Transparent middle
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  signUpButtonText: {
    color: 'red', // Red text for sign-up button
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
  },
});

export default SignUp;
