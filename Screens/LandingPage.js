import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';


const LandingPage = ({navigation}) => {

    return (
        <View style= {styles.container}>
        
            <Text style={styles.title}>
                LiveBeat
            </Text>
            
            <Text style={styles.description}>
                Your app for discovering live music events!
            </Text>

            <Button style={styles.button}
                title ="Log in" onPress={() =>navigation.navigate("Log in Page") }
            />

            <Button style={styles.button}
                title ="Sign up" onPress={() =>navigation.navigate("Sign up Page") }
            />
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginBottom: 20,
      marginTop: 10
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });

export default LandingPage;