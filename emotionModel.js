// emotionModel.js
// Core AI Engine for Emotion Detection
// Supports Face + Chat + Multimodal Fusion

import * as tf from '@tensorflow/tfjs';

// Emotion labels
export const EMOTIONS = ["Happy", "Sad", "Angry", "Fear", "Surprise", "Neutral"];

// ---------------- AI MODEL LOADER ----------------
let faceModel = null;
let chatModel = null;

export async function loadModels() {
  try {
    // Face emotion model
    faceModel = await tf.loadLayersModel(
      "bundle://assets/models/face_emotion/model.json"
    );

    // Chat emotion model
    chatModel = await tf.loadLayersModel(
      "bundle://assets/models/chat_emotion/model.json"
    );

    console.log("Emotion AI models loaded");
  } catch (err) {
    console.log("Model loading failed, using fallback logic", err);
  }
}

// ---------------- FACE EMOTION ----------------
export async function predictFaceEmotion(tensor) {
  if (!faceModel) {
    return { emotion: "Neutral", score: 0.5 };
  }

  const prediction = faceModel.predict(tensor);
  const data = await prediction.data();

  let maxIndex = 0;
  let maxValue = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i];
      maxIndex = i;
    }
  }

  return {
    emotion: EMOTIONS[maxIndex],
    score: Number(maxValue.toFixed(2))
  };
}

// ---------------- CHAT EMOTION ----------------
export async function predictChatEmotion(tensor) {
  if (!chatModel) {
    return { emotion: "Neutral", score: 0.5 };
  }

  const prediction = chatModel.predict(tensor);
  const data = await prediction.data();

  let maxIndex = 0;
  let maxValue = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i];
      maxIndex = i;
    }
  }

  return {
    emotion: EMOTIONS[maxIndex],
    score: Number(maxValue.toFixed(2))
  };
}

// ---------------- MULTIMODAL FUSION ----------------
export function fuseEmotions(faceResult, chatResult, voiceResult = null) {
  const results = [faceResult, chatResult, voiceResult].filter(Boolean);

  let scoreMap = {};

  results.forEach(r => {
    if (!scoreMap[r.emotion]) scoreMap[r.emotion] = 0;
    scoreMap[r.emotion] += r.score;
  });

  let bestEmotion = "Neutral";
  let bestScore = 0;

  for (let emo in scoreMap) {
    if (scoreMap[emo] > bestScore) {
      bestScore = scoreMap[emo];
      bestEmotion = emo;
    }
  }

  return {
    emotion: bestEmotion,
    score: Number((bestScore / results.length).toFixed(2))
  };
}
