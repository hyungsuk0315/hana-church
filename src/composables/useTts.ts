import { ref, computed } from 'vue';

export const tts = ref<SpeechSynthesisUtterance | undefined>();
export const isTtsSupported = computed(() => 'speechSynthesis' in window);
export const voiceList = computed(() => window.speechSynthesis.getVoices());

export const setVoice = (idx: number) => {
  if (tts.value != undefined) {
    console.log(`set voice to ${idx}`);
    tts.value.voice = voiceList.value[idx];
  }
};

export const speak = (text: string) => {
  if (tts.value != undefined) {
    if (window.speechSynthesis.speaking) {
      console.log('speaking');
      window.speechSynthesis.cancel();
    } else {
      console.log('ready to speak ', text);
      tts.value.text = text;
      window.speechSynthesis.speak(tts.value);
    }
  } else {
    console.error('TTS is not initialized');
  }
};

export const useTts = () => {
  console.log('useTts');
  window.speechSynthesis.cancel();

  tts.value = new SpeechSynthesisUtterance();
  const voices = voiceList.value;
  tts.value.lang = 'ko-KR';
  tts.value.voice = voices[12];
  tts.value.volume = 1; // From 0 to 1
  tts.value.rate = 1; // From 0.1 to 10
  tts.value.pitch = 1; // From 0 to 2
};
