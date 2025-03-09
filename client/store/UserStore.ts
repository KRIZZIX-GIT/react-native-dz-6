import { create } from 'zustand';
import axios, { AxiosError } from 'axios'
import UserState from '../interfaces/user-interface'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useUserStore = create<UserState>((set) =>  ({
  user: null,
	tokens: null,
  isAuth: false,
  

  registration: async (email: string, login: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.110.245:3001/api/registration', {
        email,
        login,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      set({ user: response.data.user,
        tokens: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      },
    isAuth: true });

    } catch (err: any) {
      let errorMessage = 'Ошибка соединения'
			if (err instanceof AxiosError) {
				errorMessage = err.response?.data.message || 'Ошибка соединения'
			} else if (err.request) {
				errorMessage = 'Нет ответа от сервера'
			}
			throw new Error(errorMessage)
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.110.245:3001/api/login', {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      set({ user: response.data.user,
        tokens: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      },
    isAuth: true });
    } catch (err: any) {
      let errorMessage = 'Ошибка соединения';
      
       if (err instanceof AxiosError) {
         console.log(err.response?.data);
         errorMessage = err.response?.data?.message || 'no json message';
       } else if (err.request) {
         errorMessage = 'Нет ответа от сервера';
       }
      throw new Error(errorMessage); 
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    set({ user: null, tokens: null, isAuth: false });
  },

  checkAuth: async () => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    if (!storedAccessToken || !storedRefreshToken) {
      set({ user: null, tokens: null, isAuth: false });
      console.log('No tokens found in AsyncStorage');
      return;
    }
    try {
      const response = await axios.post('http://192.168.110.245:3001/api/checkAuth', {
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      });
      set({ 
      isAuth: response.data.isAuth });
    }catch (err: any) {
      let errorMessage = 'Ошибка соединения';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'no json message';
      } else if (err.request) {
        errorMessage = 'Нет ответа от сервера';
      }
      throw new Error(errorMessage);
    }
  }

}))
