import { Accessor } from "solid-js";

const SweepButton = ({ className, text, inc, time, setTime }: { className?: string, text: string, inc: number, time: Accessor<number>, setTime: (value: number) => void }) => {
    const style = "cursor-default bg-zinc-50 w-8 h-8 border border-slate-500 hover:bg-slate-800 hover:border-zinc-50 hover:text-zinc-50 " + (className && className);

    const sweep = () => {
        setTime(time() + inc);
    }

    return (
        <button class={style} onclick={() => sweep()}>{text}</button>
    )
}

export default SweepButton;