import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/UserStore';
import { router } from 'expo-router';



export default function Main() {
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    

    return(
        <View style={styles.container}>
            <Text style={styles.tipoH1}>Главная страница</Text>
            <Text>{user?.email}</Text>
            <Text>{user?.login}</Text>
            <Text>{user?._id}</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => logout()}>
                <Text style={styles.buttonText}>Выйти из акк</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.replace('../../(auth)')}>
                    <Text style={styles.buttonText}>Вернуться на страницу авторизации</Text>
                </TouchableOpacity>
        </View>
    )
}