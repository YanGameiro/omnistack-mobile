import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, Image, AsyncStorage, StyleSheet, ScrollView } from 'react-native';

import logo from '../assets/logo1.png'
import SpotList from '../components/SpotList'

const List = () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.9:3333', {
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

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo}/>
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
    }
});

export default List;