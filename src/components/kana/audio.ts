export function playKanaAudio(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  // Cancel any ongoing speech so clicks feel snappy
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  // Slow down slightly for clarity
  utterance.rate = 0.85
  utterance.pitch = 1.0

  // Optional: Try to find a high-quality local Japanese voice if available
  const voices = window.speechSynthesis.getVoices()
  const jpVoice = voices.find(v => v.lang === "ja-JP" && v.localService)
  if (jpVoice) {
    utterance.voice = jpVoice
  }

  window.speechSynthesis.speak(utterance)
}
