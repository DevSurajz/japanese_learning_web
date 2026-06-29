export function playKanaAudio(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  // Cancel any currently playing speech so the new one plays immediately without delay.
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  // Slow down slightly for clarity
  utterance.rate = 0.85
  utterance.pitch = 1.0
  utterance.volume = 1.0 // Ensure max volume explicitly for mobile

  // Try to find a local Japanese voice, fallback to any Japanese voice
  const voices = window.speechSynthesis.getVoices()
  const jpVoice = voices.find(v => v.lang === "ja-JP" && v.localService) 
               || voices.find(v => v.lang.includes("ja"))
  
  if (jpVoice) {
    utterance.voice = jpVoice
  }

  // A minimal timeout bypasses the iOS Safari bug where synchronous cancel + speak permanently breaks audio,
  // while still playing immediately to fix the delay.
  setTimeout(() => {
    window.speechSynthesis.speak(utterance)
  }, 50)
}
