import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import logo from '../assets/logo1.png';
import api from '../services/api';

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ techs, setTechs ] = useState('');

    const handleSubmit = async () => {
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        console.log(_id);
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo}></Image>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Your Email'
                    placeholderTextColor='#999999'
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Techs</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Techs that you use'
                    placeholderTextColor='#999999'
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Find Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#444444',
        marginBottom: 8,    
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop:  30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#B800AE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default Login;