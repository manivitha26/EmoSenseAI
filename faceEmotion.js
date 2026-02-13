// faceEmotion.js
// Live Face Emotion Detection Module
// Supports: AI model integration + fallback logic

// Emotion labels
const EMOTIONS = ["Happy", "Sad", "Angry", "Fear", "Surprise", "Neutral"];

// ---------- BASIC VERSION (LOGIC BASED / DEMO) ----------
export function detectEmotionFromFace(faceData) {
  // faceData can include:
  // smileProbability, leftEyeOpenProbability, rightEyeOpenProbability

  if (!faceData) {
    return { emotion: "Neutral", score: 0.5 };
  }

  const { smile = 0, eyesOpen = 0 } = faceData;

  if (smile > 0.7) return { emotion: "Happy", score: 0.9 };
  if (smile < 0.2 && eyesOpen < 0.4) return { emotion: "Sad", score: 0.8 };
  if (eyesOpen > 0.9 && smile < 0.3) return { emotion: "Surprise", score: 0.85 };

  return { emotion: "Neutral", score: 0.6 };
}

// ---------- AI VERSION (TensorFlow.js READY) ----------
/*
 This is real AI structure.
 Later you can plug .tflite / tfjs model here
*/

let model = null;

export async function loadEmotionModel(tf) {
  try {
    model = await tf.loadLayersModel("assets/emotion_model/model.json");
    console.log("Emotion AI Model Loaded");
  } catch (e) {
    console.log("Model load failed, using logic mode", e);
  }
}

export async function detectEmotionAI(tensorFace) {
  if (!model) {
    // fallback
    return { emotion: "Neutral", score: 0.5 };
  }

  const prediction = model.predict(tensorFace);
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

// ---------- LIVE STREAM SIMULATION ----------
export function simulateLiveEmotion() {
  const emo = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
  const score = Math.random() * (0.95 - 0.6) + 0.6;

  return {
    emotion: emo,
    score: Number(score.toFixed(2))
  };
}
