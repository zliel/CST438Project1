import React, { useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';

const ArtistSearch = ({ navigation }) => {
    const [attractionName, setAttractionName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const API_KEY = process.env.API_KEY;
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&keyword=${attractionName}&typeId=KZAyXgnZfZ7v7nI&locale=*`);
            if (!response.ok) {
                throw new Error("An error occurred while searching for artists");
            }

            const data = await response.json();
            if (!data._embedded) {
                throw new Error("No artists found");
            }

            setSearchResults(data._embedded.attractions.map(attraction => (
                {
                    key: attraction.id,
                    name: attraction.name,
                    id: attraction.id,
                    url: attraction.url,
                    image_url: attraction.images[0]?.url || '' 
                }
            )));
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/Download.png')} 
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Search for an Artist</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[styles.searchInput, { color: '#fff' }]} 
                        placeholder="Search for an artist!"
                        onChangeText={newAttractionName => setAttractionName(newAttractionName)}
                        defaultValue={attractionName}
                        placeholderTextColor="#fff" 
                        testID={"searchBar"}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch} testID={"searchButton"}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data={searchResults} 
                    renderItem={({ item }) => (
                        <View style={styles.listItem} testID={"listItem"}>
                            <Image source={{ uri: item.image_url }} style={styles.listItemImage} />
                            <Text style={styles.listItemText}>{item.name}</Text>
                            <TouchableOpacity style={styles.listItemButton} onPress={() => navigation.navigate("ArtistEvents", { artistId: item.id })}>
                                <Text style={styles.listItemButtonText}>See Events</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: 'red', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    listItemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    listItemButton: {
        backgroundColor: 'red', 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    listItemButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ArtistSearch;
