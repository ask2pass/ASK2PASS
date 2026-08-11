import { createAudioPlayer, AudioPlayer } from 'expo-audio';

let player: AudioPlayer | null = null;

export function playAATVoice(voice: any): void {
  if (player) {
    player.release();
    player = null;
  }

  player = createAudioPlayer(voice);
  player.volume = 1.0;
  player.play();
}

export function stopAATVoice(): void {
  if (!player) return;

  player.pause();
  player.release();
  player = null;
}
