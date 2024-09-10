import React from 'react';
import {
    StyleSheet,
    useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LandingPage from "./Screens/LandingPage";
import Login from './Screens/Login';

const Stack = createStackNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>

                {/*To add a screen, make your component in the "/Screens directory, import it here
                and add a new Stack.Screen"*/}
                <Stack.Screen name="Landing Page" component={LandingPage}/>
                  <Stack.Screen name="Login" component={Login} options={{title: ""}}/>
                {/* <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name ="Signup" component={Signup}/> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
