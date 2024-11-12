/**
 * Alt Text.
 * @param name Text that's displayed in the element.
 * @param setAltText Prevent alt text from disappearing when leaving parent element.
 * @returns JSX Element, alt text centered below a div.
 */
const AltText = ({ name, setAltText }: { name: string, setAltText: (value: boolean) => void }) => {
    const style = "absolute flex items-center justify-center bg-slate-900 text-white w-fit h-6 p-2 rounded-lg top-10 left-1/2 transform -translate-x-1/2 select-none";
    let ref!: HTMLDivElement;
    return (
        <div class={style} ref={ref} onmouseenter={() => setAltText(true)} onmouseleave={() => setAltText(false)}>{name}</div>
    )
}

export default AltText;