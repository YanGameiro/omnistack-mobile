import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Text, Alert, SafeAreaView, Image, AsyncStorage, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import env from '../../env.js';

import logo from '../assets/logo1.png'
import SpotList from '../components/SpotList'

const List = ({ navigation }) => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(env.API_URL, {
                query: { user_id  }
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Your Schedule for ${booking.spot.company} at ${booking.date} was ${booking.approved ? 'APPROVED' : 'REJECTED'}`);
            })
            
        });        
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storedTechs => {
            const techsArray = storedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);

    async function handleLogOut() {
        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('techs', '');
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo}/>
            <TouchableOpacity onPress={() => handleLogOut()} style={styles.buttonLogOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logo: {
        height: 64,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    buttonLogOut: {
        height: 32,
        width: 200,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    }
});

export default List;