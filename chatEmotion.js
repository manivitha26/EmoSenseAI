export function analyzeChat(text){
  const emotions = {
    happy:["good","great","love","awesome"],
    sad:["bad","cry","pain","lost"],
    angry:["hate","angry","fight"],
    fear:["scared","afraid"],
    surprise:["wow","omg","shock"]
  }

  for(let emo in emotions){
    for(let w of emotions[emo]){
      if(text.toLowerCase().includes(w)){
        return {emotion:emo, score:75}
      }
    }
  }

  return {emotion:"neutral", score:50}
}
