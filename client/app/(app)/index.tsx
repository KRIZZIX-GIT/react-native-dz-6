import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './main/Main';
import { useUserStore } from '../../store/UserStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
  const router = useRouter();
  const isAuth = useUserStore((state) => state.isAuth);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth();
      } finally {
        setIsCheckingAuth(false)
      }
    };
    authenticate();
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  if (!isAuth && !isCheckingAuth) {
    router.replace('../../(auth)');
    return null;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
    </Tab.Navigator>
  );
}
