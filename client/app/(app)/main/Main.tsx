import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import React from 'react';
import { useUserStore } from '../../../store/UserStore';
import { useRouter } from 'expo-router';

export default function Main() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); 
      router.replace('../../(auth)'); 
    } catch (err) {
      console.error('Ошибка при выходе из аккаунта:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tipoH1}>Главная страница</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.login}</Text>
      <Text>{user?._id}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
}
