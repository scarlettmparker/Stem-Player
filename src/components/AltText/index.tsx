import { Accessor, createEffect } from "solid-js";

/**
 * Alt Text.
 * @param name Text that's displayed in the element.
 * @param dir Direction of the parent slider.
 * @param xPos X position of the parent slider.
 * @param yPos Y position of the parent slider.
 * @param setAltText Prevent alt text from disappearing when leaving parent element.
 * @returns JSX Element, alt text centered below a div.
 */
const AltText = ({ name, dir, xPos, yPos, setAltText }: { name: string, dir?: string, xPos: number, yPos: number, setAltText: (value: boolean) => void }) => {
    const style = "absolute flex items-center justify-center bg-slate-900 text-white w-fit h-6 p-2 rounded-lg select-none";
    
    const xOffset = (dir == 'vertical') ? 184 : 90; // accommodate for css
    const yOffset = (dir == 'vertical') ? 32 : -4;

    let ref!: HTMLDivElement;
    createEffect(() => {
        if (ref) {
            const rect = ref.getBoundingClientRect();
            ref.style.left = `${(xPos + xOffset) - rect.width / 2}px`;
            ref.style.top = `${(yPos - yOffset) - rect.height / 2}px`
        }
    })

    return (
        <div class={style} ref={ref} onmouseenter={() => setAltText(true)} onmouseleave={() => setAltText(false)}>{name}</div>
    )
}

export default AltText;