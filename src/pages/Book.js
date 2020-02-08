import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

import api from '../services/api';

const Book = ({ navigation }) => {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(
            `/spots/${id}/bookings`, 
            { date },
            { headers: { user_id }}
        );

        Alert.alert('Schedule successfully created');

        navigation.navigate('List');
    }

    async function handleCancel() {
        navigation.navigate('List');
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                placeholder='Schedule Date'
                placeholderTextColor='#999999'
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444444',
        marginBottom: 8,  
        marginTop: 30,  
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
    cancelButton: {
        marginTop: 10,
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default Book;