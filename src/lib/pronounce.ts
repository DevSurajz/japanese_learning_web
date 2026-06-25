export function speak(text: string, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const jpVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP');
  if (jpVoice) u.voice = jpVoice;
  window.speechSynthesis.speak(u);
}

export function initVoices(): Promise<void> {
  if (typeof window === 'undefined' || !window.speechSynthesis) return Promise.resolve();
  return new Promise(resolve => {
    if (window.speechSynthesis.getVoices().length) { resolve(); return; }
    window.speechSynthesis.onvoiceschanged = () => resolve();
  });
}
