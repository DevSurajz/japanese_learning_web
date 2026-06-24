export function playKanaAudio(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  // Removed window.speechSynthesis.cancel()
  // iOS Safari has a known bug where calling cancel() synchronously before speak() 
  // can permanently break speech synthesis or silence the new utterance.
  // Letting the audio queue naturally is the safest cross-platform approach for mobile.

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

  window.speechSynthesis.speak(utterance)
}
