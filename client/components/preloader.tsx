import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface PreloaderProps {
  text?: string;
  isLoad: boolean;
}

export default function Preloader({ text, isLoad }: PreloaderProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current; // For fade out
  const translateY1 = useRef(new Animated.Value(0)).current; // First cube
  const translateY2 = useRef(new Animated.Value(0)).current; // Second cube
  const translateY3 = useRef(new Animated.Value(0)).current; // Third cube

  useEffect(() => {
    if (!isLoad) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }

    const createJumpAnimation = (animatedValue: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -50, // Move cube up
            duration: 350,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0, // Move cube back down
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );

    // Start jump animations for the cubes
    const anim1 = createJumpAnimation(translateY1, 0);
    const anim2 = createJumpAnimation(translateY2, 120);
    const anim3 = createJumpAnimation(translateY3, 240);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [fadeAnim, isLoad, translateY1, translateY2, translateY3]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.preloader}>
        <Animated.View
          style={[styles.cube, { transform: [{ translateY: translateY1 }] }]}
        />
        <Animated.View
          style={[styles.cube, { transform: [{ translateY: translateY2 }] }]}
        />
        <Animated.View
          style={[styles.cube, { transform: [{ translateY: translateY3 }] }]}
        />
      </View>
      {text && <Text style={styles.prompt}>{text}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    zIndex: 999,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)", // Dark backdrop
  },
  preloader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 80,
    height: 48,
    marginBottom: 15,
  },
  cube: {
    width: 16,
    height: 16,
    backgroundColor: "white",
    borderRadius: 5,
  },
  prompt: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    width: "95%",
  },
});
