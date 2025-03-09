import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import  Main  from './main/Main'
import { useUserStore } from '../../store/UserStore'
import { useEffect } from 'react'
import { router } from 'expo-router'

const Tab = createBottomTabNavigator()

export default function NavigatorBar() {

  const isAuth = useUserStore((state) => state.isAuth)
  const checkAuth = useUserStore((state) => state.checkAuth)
  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth()
      } catch (err) {
        console.log(err)
      }
    }
    authenticate()
  }, [])
  if (!isAuth) {
    router.replace('../../(auth)')
    return null
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
    </Tab.Navigator>
  )
}
