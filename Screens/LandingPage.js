import React, {useEffect, useState} from "react";
import {Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LandingPage = ({navigation}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem("user");
            setUser(JSON.parse(user));
        }
        fetchUser();
    }, []);

    return (
        <ImageBackground
            source={require('../assets/Download.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    LiveBeat
                </Text>

                <Text style={styles.text}>
                    Your app for discovering live music events!
                </Text>

                {user ? (
                        <View style={styles.loggedInButtonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Artist Search")}>
                                <Text style={styles.buttonText}>Artist Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Event Search")}>
                                <Text style={styles.buttonText}>Event Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={async () => {
                                await AsyncStorage.removeItem("user");
                                setUser(null);}
                            }>
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                            </View>
                    ) :
                    <View style={styles.loggedOutButtonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>

                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loggedInButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 2,
    },
    button: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
    },
    loggedOutButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 2,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
});

export default LandingPage;
