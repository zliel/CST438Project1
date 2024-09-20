import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

const LandingPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                LiveBeat
            </Text>

            <Text style={styles.text}>
                Your app for discovering live music events!
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                />
                <Button
                    title="Signup"
                    onPress={() => navigation.navigate("Signup")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 2,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
});

export default LandingPage;