import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const Profile = ({navigation}) => {
    const [username, setUsername] = useState('');
    
    //retriving 
    const getUsername = async () => {
        try {
          const value = await AsyncStorage.getItem('username');
          if (value !== null) {
            setUsername(value);
          }
    
        }catch(e){
            console.error('Error reading username', e);
        }
      };

    useEffect(() => {
      getUsername();
    }, []);
    
    return (
       <View style={styles.container}>
        <Text style={styles.username}>Hello, {username}!</Text>
        <Button style={styles.button}
          title ="Update Profile"
          onPress={() =>navigation.navigate("Update Profile")}
        />
        <Button
         title="My Events"
         onPress={() => navigation.navigate("My Events")}
        />

       </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  username: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Profile;