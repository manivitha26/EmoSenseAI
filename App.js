import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CameraView from './components/CameraView';
import ChatBox from './components/ChatBox';

export default function App() {
  const [emotion, setEmotion] = useState("Neutral");
  const [score, setScore] = useState(0);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🧠 EmoSense AI</Text>

      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Live Emotion: {emotion}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Confidence Score: {score}%
      </Text>

      <CameraView setEmotion={setEmotion} setScore={setScore} />

      <ChatBox />
    </ScrollView>
  );
}
