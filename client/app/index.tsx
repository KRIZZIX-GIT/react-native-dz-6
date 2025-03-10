import { Redirect } from 'expo-router';
import { useUserStore } from '../store/UserStore';
import { useEffect, useState } from 'react';
import Preloader from '../components/preloader';

export default function Index() {
  const isAuth = useUserStore((state) => state.isAuth);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Загрузка...');

  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }finally {
        setIsLoading(false);
      }
    };

    authenticate();

    const timer = setTimeout(() => {
      setLoadingText('Это занимает больше времени, чем ожидалось...');
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader text={loadingText} isLoad={!isLoading} />;
  }

  return isAuth ? <Redirect href="/(app)" /> : <Redirect href="/(auth)" />;
}
