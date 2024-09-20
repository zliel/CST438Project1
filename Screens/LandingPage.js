import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const LandingPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>

                <Text style={styles.title}>
                    LiveBeat
                </Text>

                <Text style={styles.text}>
                    Your app for discovering live music events!
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Artist Search")}>
                    <Text style={styles.buttonText}>Artist Search</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
        width: '80%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3346ff',
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'center',
        marginBottom: 30,
      },
      
  });

export default LandingPage;