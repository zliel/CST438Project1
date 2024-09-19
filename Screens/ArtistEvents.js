import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, Alert, Image, ActivityIndicator} from 'react-native';
import { useRoute } from "@react-navigation/native";
import { NativeModules } from 'react-native';

const { DatabaseModule } = NativeModules;
const ArtistEvents = ({navigation}) => {
    const route = useRoute();
    const { artistId } = route.params;

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistName, setArtistName] = useState("");

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
    }, [])

    const handleLike = async () => {
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Events for {artistName}
            </Text>
            {loading ? <Text>Loading...</Text> : (
                <View style={styles.eventContainer}>
                    {events.map(event => (
                        <View key={event.id} style={styles.eventDetails}>
                            <Image source={{uri: event.imageUrl}} style={styles.eventImage}/>
                            <Text style={styles.eventText}>{event.name}</Text>
                            <Text style={styles.eventText}>Date: {event.date}</Text>
                            <Text style={styles.eventText}>Venue: {event.venueName}</Text>
                            <Text style={styles.eventText}>Address: {event.venueAddress}</Text>
                            <Text style={styles.eventText}>Price Range: {event.priceRange}</Text>
                            <Button title={"I'm Interested!"} onPress={handleLike} style={styles.eventButton}/>
                        </View>
                    ))}
                </View>
            )}
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
        shadowOffset: { width: 0, height: 2 },
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
});

export default ArtistEvents;