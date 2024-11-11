import { Accessor } from "solid-js";

/**
 * 
 * @param audioElement HTML Audio Element for the background audio.
 * @param currentVolume Current volume of the audio.
 * @param playing Audio playing or not.
 */
const manageAudio = (audioElement: HTMLAudioElement, currentVolume: Accessor<number>, playing: Accessor<boolean>) => {
    audioElement.volume = currentVolume() / 100;
    if (playing()) {
        audioElement.play().catch((err) => {
            console.error("Error playing audio:", err);
        });
    } else {
        audioElement.pause();
    }
}

export default manageAudio;