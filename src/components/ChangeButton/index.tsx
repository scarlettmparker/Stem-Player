import { Accessor } from "solid-js";

/**
 * 
 * @param className Extra CSS styling if required.
 * @param text Text that shows up in the button.
 * @param inc Increment (positive or negative int).
 * @param songLength Length of songs (or whatever is incremented).
 * @param song Current index of songs.
 * @param setSong Setter for the song index.
 * @returns JSX Element of the Change Button.
 */
const ChangeButton = ({ className, text, inc, songLength, song, setSong }: { className?: string, text: string, inc: number, songLength: number, song: Accessor<number>, setSong: (value: number) => void }) => {
    let buttonStyle = "flex items-center justify-center bg-slate-800 border-slate-500 border rounded-3xl text-white text-2xl w-8 h-12 select-none"
        + " hover:bg-slate-200 hover:border-slate-800 hover:text-black";
    if (className) {
        buttonStyle += ` ${className}`;
    }

    const incrementSong = () => {
        const newSongIndex = (song() + inc + songLength) % songLength;
        setSong(newSongIndex);
    }

    return (
        <button class={buttonStyle} onClick={() => incrementSong()}>{text}</button>
    )
}

export default ChangeButton;