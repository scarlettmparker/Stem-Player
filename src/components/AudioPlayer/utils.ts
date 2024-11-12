/**
 * 
 * @param audioElement HTML Audio Element for the background audio.
 * @param currentVolume Current volume of the audio.
 * @param playing Audio playing or not.
 */
const manageAudio = (audioElement: HTMLAudioElement, currentVolume: number, master: number, playing: boolean, currentTime: number) => {
    audioElement.volume = currentVolume * master;
  
    if (playing) {
      if (audioElement.paused) {
        audioElement.play().catch((err) => console.error("Error playing audio:", err));
      }
      // synchronize playback with global time
      if (Math.abs(audioElement.currentTime - currentTime) > 0.1) {
        audioElement.currentTime = currentTime;
      }
    } else {
      audioElement.pause();
    }
  };

export default manageAudio;