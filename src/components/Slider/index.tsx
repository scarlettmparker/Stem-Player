import { createEffect, createSignal, type Component } from 'solid-js';
import AltText from '../AltText';
import Props, { MasterProps } from './props';

/**
 * A Slider component that allows the user to select a value within a specified range.
 * 
 * @param step Value by which the slider changes on change.
 * @param min Minimum value of the slider.
 * @param max Maximum value of the slider.
 * @param name Name for the alt text of the slider.
 * @param dir Direction the slider displays.
 * @param value Current value of the slider.
 * @param setValue Callback to update the current value of the slider.
 * @returns JSX Element, rendered Slider component.
 */
const Slider: Component<Props> = ({ idx, scrollRef, step, min, max, name, dir, value, setValue, setMasterValue }) => {
    const [altText, setAltText] = createSignal(false);
    const [xPos, setXPos] = createSignal(0);
    const [yPos, setYPos] = createSignal(0);

    // const master = setMasterValue ? true : false;
    const divStyle = "w-4 mr-4"
        + (dir == "vertical" ? " relative flex items-center justify-center" : " absolute left-10 mt-1");
    const inputStyle = "accent-mimi bg-inherit"
        + (dir == "vertical" ? " relative left-1/2 slider-vertical h-24 w-4" : " relative w-24 mr-32"); // change direction of slider based on props
    const filteredName = name.substring(name.lastIndexOf("\\") + 1)

    let sliderRef!: HTMLInputElement;

    // update slider values upon change
    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (idx && setValue) {
            setValue(idx, Number(target.value));
        } else if (setMasterValue) {
            setMasterValue(Number(target.value));
        }
    };

    // deal with moving alt text
    const handleScroll = () => {
        if (sliderRef && scrollRef) {
            const sliderRect = sliderRef.getBoundingClientRect();
            const scrollRect = scrollRef.getBoundingClientRect();

            setXPos(sliderRect.left - scrollRect.left);
            setYPos(sliderRect.top - scrollRect.top);
        }
    }

    // get position of sliders for alt text
    createEffect(() => {
        handleScroll();

        scrollRef?.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            scrollRef?.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    }, [scrollRef, sliderRef])

    return (
        <>
            <div class={divStyle} onmouseenter={() => setAltText(true)} onmouseleave={(() => setAltText(false))} >
                <input type="range" class={inputStyle} value={value()} min={min} max={max} step={step}
                    ref={sliderRef} onInput={handleChange} />
            </div>
            {altText() && <AltText name={filteredName} dir={dir} xPos={xPos()} yPos={yPos()} setAltText={setAltText}/>}
        </>
    )
}

export default Slider;