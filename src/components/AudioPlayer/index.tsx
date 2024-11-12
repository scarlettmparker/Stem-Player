import { createEffect, type Component } from 'solid-js';
import { API_BASE_URL } from '../../utils/consts';
import manageAudio from './utils';
import Props from './props';

/**
 * 
 * @param index Index of audio element for volume controls.
 * @param name Name of the current audio element (for file pathing).
 * @param playing Audio playing or not.
 * @param volume Volume of current audio element (0-1).
 * @returns JSX Element, invisible Audio Player.
 */
const AudioPlayer: Component<Props> = ({ idx, name, playing, volume }) => {
    const src = `${API_BASE_URL}/${name}`;
    let audioElement: HTMLAudioElement | null = null;

    createEffect(() => {
        const currentVolume = volume();
        if (audioElement) {
            manageAudio(audioElement, currentVolume, playing());
        }
    }, [volume(), idx, playing()]); 

    return <audio ref={(el) => { audioElement = el; }} src={src} preload="auto" />;
};

export default AudioPlayer;