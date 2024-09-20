import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';

const MyEventsPage = () => {
    const [likedEvents, setLikedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch liked events from the API
    const fetchLikedEvents = async () => {
        try {
            // Get the current user's liked event IDs from AsyncStorage
            const user = await AsyncStorage.getItem('user');
            const likedEventIds = JSON.parse(user).likedEvents
            if (!likedEventIds) {
                setLikedEvents([]);
                setLoading(false);
                return;
            }
            
            const eventData = []
            // const eventPromises = likedEventIds.map((id) =>
            //     fetch(`https://app.ticketmaster.com/discovery/v2/events?${id}?apikey=${API_KEY}&locale=*`)
            // .then((item) => {
            //   console.dir(`RESPONSE: ${item}`)
            // })
            //         .then((response) => response.json())
            //         .then((data) => {
            //           eventData.push(data)
            //         })
            //         .catch((error) => console.error('Error fetching event:', error))
            // );

            for (id in likedEventIds) {
              const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?${id}?apikey=${API_KEY}&locale=*`)
              const data = response.json()
              console.log(data)
              eventData.push(data)

            }
            setLikedEvents(eventData)

            // const eventsData = await Promise.all(eventPromises);
            // const filteredEventsData = eventData.filter(event => event && event.name); // Filter out any undefined or malformed responses
            setLikedEvents(filteredEventsData);
        } catch (error) {
            console.error('Error fetching liked events:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchLikedEvents();
    }, []);
    const renderEvent = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventName}>{item.name}</Text>
            {/* <Text style={styles.eventDetails}>{item.dates.start.localDate} at {item.dates.start.localTime}</Text> */}
        </View>
    );
    return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={likedEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          ListEmptyComponent={<Text style={styles.noEventsText}>No liked events found.</Text>}
        />
      )}
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
  eventItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
  },
  noEventsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyEventsPage;


    



