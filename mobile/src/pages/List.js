import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, AsyncStorage, Image, Alert, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.31:3333', {
                query: { user_id },
            })
        });

        socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            
            setTechs(techsArray);
        })
    }, []);
    
    return (
        <SafeAreaView style={style.container}>
            <Image style={style.logo} source={logo} />            
            {/* gera listas de spots conforme a tecnologia */}
            <ScrollView>
                {techs.map((tech, index) => <SpotList key={index} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
});