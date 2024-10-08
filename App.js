import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LandingPage from './Screens/LandingPage';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import ArtistSearch from './Screens/ArtistSearch';
import Profile from "./Screens/ProfilePage";
import EventSearch from "./Screens/EventSearch";
import MyEventsPage from "./Screens/MyEventsPage";
import ArtistEvents from "./Screens/ArtistEvents";

const Drawer = createDrawerNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{unmountOnBlur: true}}>
          <Drawer.Screen name="Landing Page" component={LandingPage} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Signup" component={Signup} />
          <Drawer.Screen name="Artist Search" component={ArtistSearch} />
          <Drawer.Screen name="ArtistEvents" component={ArtistEvents} options={{drawerItemStyle: {display: 'none'}}}/>
          <Drawer.Screen name="Event Search" component={EventSearch} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="My Events" component={MyEventsPage}/>
        </Drawer.Navigator>
      </NavigationContainer>
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
