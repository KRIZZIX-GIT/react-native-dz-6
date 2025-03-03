import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  const animation = React.useRef(new Animated.Value(visible ? 1 : 0)).current;

  React.useEffect(() => {
    if (visible) {
      // Анимация появления
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Автоматическое скрытие через 3 секунды
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: animation, transform: [{ translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 20], // Анимация снизу вверх
        }) }] },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Toast;
