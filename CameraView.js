import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { simulateLiveEmotion } from '../emotion/faceEmotion';

export default function CameraView({ setEmotion, setScore }) {

  useEffect(() => {
    const interval = setInterval(() => {
      const result = simulateLiveEmotion();   // live simulation
      setEmotion(result.emotion);
      setScore(Math.round(result.score * 100));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ padding: 15 }}>
      <Text>📷 Live Camera Emotion Detection Running...</Text>
    </View>
  );
}
