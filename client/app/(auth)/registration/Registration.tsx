import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import styles from './style';
import LoadingButton from '../../../components/loadingBtn';
import { useUserStore } from '../../../store/UserStore';
import { router } from 'expo-router';
import Toast from '../../../components/error-message'; 
import Feather from '@expo/vector-icons/Feather';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState(''); 
  const [showToast, setShowToast] = useState(false); 

  const handlePass = (value: string) => {
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); 
  };

  const [touched, setTouched] = useState({
    email: false,
    login: false,
    password: false,
  });

  const validateEmail = (email: string) => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return email.length === 0 || emailPattern.test(email);
  };

  const validateLogin = (login: string) => {
    return login.length === 0 || (login.length >= 3 && login.length <= 16);
  };

  const validatePassword = (password: string) => {
    return password.length === 0 || (password.length >= 6 && password.length <= 16);
  };

  const handleBlur = (field: any) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'login') {
      setLogin(value);
    } else if (field === 'password') {
      setPassword(value);
    }
    setTouched({ ...touched, [field]: true }); 
  };

  const isFormValid = () => {
    return (
      validateEmail(email) &&
      validateLogin(login) &&
      validatePassword(password) &&
      email.length > 0 &&
      login.length > 0 &&
      password.length > 0
    );
  };

  function clearForm() {
    setEmail('');
    setLogin('');
    setPassword('');
    setTouched({
      email: false,
      login: false,
      password: false,
    });
  }

  const registration = useUserStore((state) => state.registration);
  const handleSubmit = async () => {
    try {
      if (!isFormValid()) {
        throw new Error('Пожалуйста, проверьте все поля.');
      }
     await registration(email, login, password);
     alert('Регистрация прошла успешно!');
     router.replace('../../(app)');
     clearForm();
    } catch (error: string | any) {
      if (error.message === 'Пользователь с таким email уже существует') {
        setErrorMessage('Пользователь с таким email уже существует');
      }
      else if (error.message === 'Пользователь с таким логином уже существует') {
        setErrorMessage('Пользователь с таким логином уже существует');
      }else if (error.message === 'Пожалуйста, проверьте все поля.') {
        setErrorMessage('Все поля должны быть заполнены.');
      }
       else {
        setErrorMessage('Произошла ошибка при регистрации');
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
      <Text style={styles.tipoH1}>Регистрация</Text>

      <View style={styles.content}>

        <View style={styles.inputContainer}>
        <Text style={styles.tipoH2}>Логин:</Text>
        <TextInput
          placeholder="Введите логин"
          style={validateLogin(login) ? styles.input : styles.inputError}
          value={login}
          onChangeText={(value) => handleChange('login', value)}
          onBlur={() => handleBlur('login')}
        />
        {touched.login && !validateLogin(login) && (
          <Text style={styles.errorText}>Логин должен сожержать от 3 до 16 символов</Text>
        )}
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.tipoH2}>Email:</Text>
        <TextInput
          placeholder="Введите email"
          style={validateEmail(email) ? styles.input : styles.inputError}
          value={email}
          onChangeText={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
        />
        {touched.email && !validateEmail(email) && (
          <Text style={styles.errorText}>Введите корректный email</Text>
        )}
        </View>
    
        <View style={styles.inputContainer}>
        <Text style={styles.tipoH2}>Пароль:</Text>
        <TextInput
          placeholder="Введите пароль"
          style={validatePassword(password) ? styles.input : styles.inputError}
          value={password}
          onChangeText={handlePass}
          secureTextEntry={!isPasswordVisible} 
          onBlur={() => handleBlur('password')}
        />

        <View style={styles.eyeBtn}>
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={25} color="white" />
        </TouchableOpacity>
      </View>

        {touched.password && !validatePassword(password) && (
          <Text style={styles.errorText}>Пароль должен сожержать от 6 до 16 символов</Text>
        )}
        </View>
      </View>

      <LoadingButton onPress={handleSubmit} />

      <Text style={styles.tipoH3}>или</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('../login/Login')}>
        <Text style={styles.tipoH4}>Войти</Text>
      </TouchableOpacity>

      <Toast message={errorMessage} visible={showToast} />
    </KeyboardAvoidingView>
  );
}
