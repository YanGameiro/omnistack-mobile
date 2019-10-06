import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, AsyncStorage } from 'react-native';

import logo from '../assets/logo1.png'

const List = () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storedTechs => {
            const techsArray = storedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);

    return (
        <SafeAreaView >
            <Image source={logo}/>
        </SafeAreaView>
    )
}

export default List;