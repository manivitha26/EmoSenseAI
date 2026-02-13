import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { analyzeChat } from '../emotion/chatEmotion';

export default function ChatBox() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({ emotion: "neutral", score: 0 });

  return (
    <View style={{ padding: 15 }}>
      <TextInput
        placeholder="Type message..."
        style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
        onChangeText={(t) => {
          setText(t);
          const res = analyzeChat(t);
          setResult(res);
        }}
      />

      <Text>💬 Chat Emotion: {result.emotion}</Text>
      <Text>📊 Score: {result.score}%</Text>
    </View>
  );
}
