import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import styles from './style';
import LoadingButton from '../../../components/loadingBtn';
import { useUserStore } from '../../../store/UserStore';
import { router } from 'expo-router';
import Toast from '../../../components/error-message'; 
import Feather from '@expo/vector-icons/Feather';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [showToast, setShowToast] = useState(false); 

   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

   const handlePass = (value: string) => {
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Переключение состояния видимости
  };

  const isFormValid = () => {
    return email.length > 0 && password.length > 0;
  };

  const login = useUserStore((state) => state.login);
  
  const handleSubmit = async () => {
    try {
      if (!isFormValid()) {
        throw new Error('Все поля должны быть заполнены.');
      }
      await login(email, password);
      alert('Вход выполнен успешно!');
      router.replace('../../main/Main'); 
    } catch (error: any) {
      if (error.message === 'Пользователь не найден') {
        setErrorMessage('Пользователь не найден');
      } else if (error.message === 'Неверный пароль') {
        setErrorMessage('Неверный пароль');
      } else if (error.message === 'Все поля должны быть заполнены.') {
        setErrorMessage('Все поля должны быть заполнены.');
      }
       else {
        setErrorMessage('Произошла ошибка при входе');
      }
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.tipoH1}>Вход</Text>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.tipoH2}>Email:</Text>
          <TextInput
            placeholder="Введите email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.tipoH2}>Пароль:</Text>
          <TextInput
            placeholder="Введите пароль"
            style={styles.input}
            value={password}
            onChangeText={handlePass}
            secureTextEntry={!isPasswordVisible} 
          />
           <View style={styles.eyeBtn}>
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={25} color="white" />
        </TouchableOpacity>
      </View>
        </View>
      </View>

      <LoadingButton onPress={handleSubmit} />

      <Text style={styles.tipoH3}>или</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('../registration/Registration')}>
        <Text style={styles.tipoH4}>Зарегистрироваться</Text>
      </TouchableOpacity>

      <Toast message={errorMessage} visible={showToast} />
    </KeyboardAvoidingView>
  );
}
