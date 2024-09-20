import React, {useEffect, useState} from "react";
import {Alert, Button, FlatList, Image, NativeModules, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const {DatabaseModule} = NativeModules;
const EventSearch = ({navigation}) => {
    const [eventName, setEventName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem("user");
            setUser(JSON.parse(user));
        }
        fetchUser();
    }, [searchResults]);


    const handleSearch = async () => {
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.API_KEY}&keyword=${eventName}&locale=*`);
            if (!response.ok) {
                throw new Error("An error occurred while searching for events");
            }

            const data = await response.json();
            if (!data._embedded) {
                throw new Error("No events found");
            } else if (data._embedded.events.length === 0) {
                throw new Error("No events found");
            }

            setSearchResults(data._embedded.events.map(event => ({
                id: event.id,
                name: event.name,
                imageUrl: event.images[0].url,
                date: event.dates.start.localDate,
                venueName: event._embedded.venues[0].name,
                venueAddress: event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].state.name + ", " + event._embedded.venues[0].country.name + ", " + event._embedded.venues[0].postalCode,
                priceRange: event.priceRanges ? `\$${event.priceRanges[0].min} - \$${event.priceRanges[0].max}` : "Not Provided"
            })));
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    }

    const handleLike = async (eventId) => {
        // Validate that the user is logged in
        if (!user) {
            Alert.alert("Error", "You must be logged in to like an event");
            return;
        }

        try {
            let response;

            // If the user has already liked the event, unlike it, and vice versa
            if (user.likedEvents && user.likedEvents.includes(eventId)) {
                response = await DatabaseModule.unlikeEvent(user.id, eventId);
            } else {
                response = await DatabaseModule.likeEvent(user.id, eventId);
            }

            // If there was an error while liking/unliking the event, throw an error
            if (!response) {
                throw new Error("An error occurred while liking the event");
            }

            // Update the user object in AsyncStorage and state
            const updatedUser = JSON.parse(response);
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Search for an Event
            </Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an Event!"
                    onChangeText={newEventName => setEventName(newEventName)}
                    defaultValue={eventName}
                    testID={"searchBar"}
                />
                <Button style={styles.searchButton}
                        title={"Search"}
                        onPress={handleSearch}
                        testID={"searchButton"}
                />
            </View>

            <FlatList data={searchResults} renderItem={({item}) => (
                <View style={styles.eventContainer} testID={"listItem"}>
                    <Image source={{uri: item.imageUrl}} style={styles.eventImage}/>
                    <Text style={styles.eventTitle}>{item.name}</Text>
                    <Text style={styles.eventText}>Date: {item.date}</Text>
                    <Text style={styles.eventText}>Venue: {item.venueName}</Text>
                    <Text style={styles.eventText}>Address: {item.venueAddress}</Text>
                    <Text style={styles.eventText}>Price Range: {item.priceRange}</Text>
                    {user && user.likedEvents?.includes(item.id) ? (
                        <Button style={styles.listItemButton}
                                title={"Unlike"}
                                onPress={() => handleLike(item.id)}/>
                    ) : (
                        <Button style={styles.listItemButton}
                                title={"Like"}
                                onPress={() => handleLike(item.id)}/>
                    )}
                </View>
            )}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    eventContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    eventImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    eventText: {
        fontSize: 16,
        color: '#333',
    },
    eventDetails: {
        marginTop: 10,
    },
    eventButton: {
        backgroundColor: '#28a745',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    eventButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    eventButtonUnlike: {
        backgroundColor: '#dc3545',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default EventSearch;