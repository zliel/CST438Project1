import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Button, FlatList, Image, NativeModules, StyleSheet, Text, View} from 'react-native';
import {useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {DatabaseModule} = NativeModules;
const ArtistEvents = ({navigation}) => {
    const route = useRoute();
    const {artistId} = route.params;

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistName, setArtistName] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.API_KEY}&attractionId=${artistId}&locale=*`);
                const data = await response.json();
                if (!data._embedded) {
                    throw new Error("No events found");
                }
                setEvents(data._embedded.events.map(event => ({
                    id: event.id,
                    name: event.name,
                    imageUrl: event.images[0].url,
                    date: event.dates.start.localDate,
                    venueName: event._embedded.venues[0].name,
                    venueAddress: event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].state.name + ", " + event._embedded.venues[0].country.name + ", " + event._embedded.venues[0].postalCode,
                    priceRange: event.priceRanges ? `\$${event.priceRanges[0].min} - \$${event.priceRanges[0].max}` : "Not Provided"
                })));
                setArtistName(data._embedded.events[0]._embedded.attractions[0].name);

                setLoading(false);
            } catch (error) {
                Alert.alert("Error", error.message);
                navigation.navigate("Artist Search");
            }
        }
        fetchEvents();
    }, [artistId])

    useEffect(() => {
        const fetchUser = async () => {
            const foundUser = await AsyncStorage.getItem("user");
            if (foundUser) {
                const parsedUser = JSON.parse(foundUser);
                setUser(parsedUser);
            } else {
                setUser(null);
            }
        }
        fetchUser();
    }, [artistId])

    const handleLike = async (eventId) => {
        if (!user) {
            Alert.alert("Error", "You must be logged in to like an event");
            return;
        }

        try {
            let response;
            if (user.likedEvents && user.likedEvents.includes(eventId)) {
                response = await DatabaseModule.unlikeEvent(user.id, eventId);
            } else {
                response = await DatabaseModule.likeEvent(user.id, eventId);
            }

            if (!response) {
                throw new Error("An error occurred while liking the event");
            }

            const updatedUser = JSON.parse(response);
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }

    const renderItem = ({item}) => (
        <View style={styles.eventContainer}>
            <View key={item.id} style={styles.eventDetails}>
                <Image source={{uri: item.imageUrl}} style={styles.eventImage}/>
                <Text style={styles.eventTitle}>{item.name}</Text>
                <Text style={styles.eventText}>Date: {item.date}</Text>
                <Text style={styles.eventText}>Venue: {item.venueName}</Text>
                <Text style={styles.eventText}>Address: {item.venueAddress}</Text>
                <Text style={styles.eventText}>Price Range: {item.priceRange}</Text>
                {user && user.likedEvents && user.likedEvents.includes(item.id) ?
                    <Button title={"Unlike"} onPress={() => handleLike(item.id)} style={styles.eventButtonUnlike}/>
                    : <Button title={"Like"} onPress={() => handleLike(item.id)} style={styles.eventButton}/>
                }
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Events for {artistName}
            </Text>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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

export default ArtistEvents;