import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/UserStore';
import { router } from 'expo-router';

export default function Main() {
    function exit() {
        router.replace('/')
    }


    return(
        <View style={styles.container}>
            <Text style={styles.tipoH1}>Главная страница</Text>
            <TouchableOpacity style={styles.btn} onPress={exit}>
                <Text style={styles.btnText}>Выйти</Text>
                </TouchableOpacity>
        </View>
    )
}