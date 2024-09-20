import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
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
                        <Button
                            title="Logout"
                            onPress={async () => {
                                await AsyncStorage.removeItem("user");
                                setUser(null);
                            }}
                        />
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
    loggedInButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 2,
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
        color: 'black',
        textAlign: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
});

export default LandingPage;