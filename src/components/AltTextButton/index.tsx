import { Accessor } from "solid-js";

const AltTextButton = ({ className, playing, setPlaying }: { className?: string, playing: Accessor<boolean>, setPlaying: (value: boolean) => void }) => {
    const style = "cursor-default bg-zinc-50 w-8 h-8 border border-slate-500 hover:bg-slate-800 hover:border-zinc-50 hover:text-zinc-50 " + (className && className);
    return (
        <button class={style} onclick={() => setPlaying(!playing())}>{playing() ? "❚❚" : ">"}</button>
    )
}

export default AltTextButton;