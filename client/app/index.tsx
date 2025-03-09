import { Redirect } from 'expo-router';
import { useUserStore } from '../store/UserStore';
import { useEffect, useState } from 'react';
export default function Index() {

  const isAuth = useUserStore((state) => state.isAuth);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth();        
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, []);
  if (isLoading) {
    return null; // Здесь можно добавить спиннер загрузки
  }
  return isAuth ?  <Redirect href="/(app)"  /> : <Redirect href="/(auth)" />;
}