import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.tipoH1}>Добро пожаловать!</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/registration/Registration')}>
          <Text style={styles.buttonText}>Регистрация</Text>
        </TouchableOpacity>
        <Text style={styles.tipoH2}>или</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login/Login')}>
          <Text style={styles.buttonText}>Вход</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(158, 136, 204)',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    justifyContent: 'center',
  },
  tipoH1: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  content: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
  },
  button: {
    width: '100%',
    height: 50,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipoH2: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  }

  
});