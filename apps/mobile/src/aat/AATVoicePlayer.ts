import { Audio } from 'expo-av';

let sound: Audio.Sound | null = null;

export async function playAATVoice(voice: any): Promise<void> {
  if (sound) {
    await sound.unloadAsync();
    sound = null;
  }

  const result = await Audio.Sound.createAsync(voice, {
    shouldPlay: true,
    volume: 1.0,
  });

  sound = result.sound;
}

export async function stopAATVoice(): Promise<void> {
  if (!sound) return;
  await sound.stopAsync();
  await sound.unloadAsync();
  sound = null;
}
