import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
      height: 250,
      borderRadius: 10,
      marginBottom: 10,
      padding: 10,
      justifyContent: 'space-around',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
    },
    inputContainer: {
      width: '100%',
      height: 100,
      justifyContent: 'flex-start',
      gap: 5,
      backgroundColor: 'rgba(69, 239, 12, 0)',
    },
    tipoH2: {
      color: 'white',
      fontSize: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 10,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
    },
    inputError: {
      width: '100%',
      height: 50,
      borderColor: 'red',
      borderWidth: 3,
      borderRadius: 10,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
    },
    footer: {
      backgroundColor: 'rgba(69, 239, 12, 0)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    tipoH3: {
      color: 'white',
      fontSize: 20,
    },
    tipoH4: {
      color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
    },
    loginButton: {
      width: '100%',
      height: 50,
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      gap: 10,
    },
    eyeBtn: {
      position: 'absolute',
      right: 15,
      top: 38,
      zIndex: 10,
    }
  });

 