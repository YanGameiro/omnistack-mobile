import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

const SpotList = ({ tech }) => {
    const [spots, setSpots] = useState([]);
    useEffect(()=>{
        async function loadSpots() {
            const response = await api.get('/spots', { params: {tech} });
            setSpots(response.data);
        }


        loadSpots();
    },[]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                spots that uses: <Text style={styles.bold}>{tech}</Text>
            </Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item })=>(
                    <View style={styles.listItem}>
                        <Image 
                        style={styles.thumbnail}
                        source={{ uri: item.thumbnail_url}}
                        />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>
                            {item.price ? `$${item.price}/day` : `FREE`}
                        </Text>
                        <TouchableOpacity onPress={()=>{}} style={styles.button}>
                            <Text style={styles.buttonText}>Schedule</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
    },
    title: {
        fontSize: 20,
        color: '#444444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height:120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#B800AE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default SpotList;