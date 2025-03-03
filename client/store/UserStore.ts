import { create } from 'zustand';
import axios, { AxiosError } from 'axios'
import UserState from '../interfaces/user-interface'


export const useUserStore = create<UserState>((set) =>  ({
  user: null,
	tokens: null,
  

  registration: async (email: string, login: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.110.245:3001/api/registration', {
        email,
        login,
        password,
      });
      set({ user: response.data.user,
        tokens: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      }, });
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
      set({ user: response.data.user,
        tokens: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      }, });
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
  }

}))
