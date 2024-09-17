import React, {useState} from "react";
import {Button, FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';


const ArtistSearch = ({navigation}) => {
    const [attractionName, setAttractionName] = useState('');
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async () => {
        // Use our API key to search for artists from the ticketmaster API
        const API_KEY = process.env.API_KEY
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&keyword=${attractionName}&typeId=KZAyXgnZfZ7v7nI&locale=*`);
        const data = await response.json();

        // Set the search results to the data we got back
        setSearchResults(data._embedded.attractions.map(attraction => (
            {
                key: attraction.id,
                name: attraction.name,
                id: attraction.id,
                url: attraction.url,
                image_url: attraction.images[0].url
            })));
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Search for an Artist
            </Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an artist!"
                    onChangeText={newAttractionName => setAttractionName(newAttractionName)}
                    defaultValue={attractionName}
                    testID={"searchbar"}
                />
                <Button style={styles.searchButton}
                        title={"Search"}
                        onPress={handleSearch}
                        testID={"searchButton"}
                />
            </View>

            <FlatList data={searchResults} renderItem={({item}) => (
                <View style={styles.listItem}>
                    <Image source={{uri: item.image_url}} style={styles.listItemImage}/>
                    <Text style={styles.listItemText}>{item.name}</Text>
                    <Button style={styles.listItemButton}
                            title={"See Events"}
                            onPress={() => navigation.navigate("ArtistEvents", {artistId: item.id})}/>
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
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    listItemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    listItemButton: {
        backgroundColor: '#28a745',
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