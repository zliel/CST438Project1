import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
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
                        <Button
                            title="Artist Search"
                            onPress={() => navigation.navigate("Artist Search")}
                        />
                        <Button
                            title="Event Search"
                            onPress={() => navigation.navigate("Event Search")}
                        />
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
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <Button
                        title="Signup"
                        onPress={() => navigation.navigate("Signup")}
                    />
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
    loggedOutButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
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