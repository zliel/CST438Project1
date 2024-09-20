import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LandingPage from './Screens/LandingPage';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import ArtistSearch from './Screens/ArtistSearch';
import { ThemeProvider } from './Screens/ThemeContext'; 

const Drawer = createDrawerNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider>
      {/* Wrap only the NavigationContainer, not Drawer.Navigator */}
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{unmountOnBlur: true}}>
          <Drawer.Screen name="Landing Page" component={LandingPage} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Signup" component={Signup} />
          <Drawer.Screen name="Artist Search" component={ArtistSearch} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

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
