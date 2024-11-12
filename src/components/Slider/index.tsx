import { createSignal, type Component } from 'solid-js';
import AltText from '../AltText';
import Props from './props';

/**
 * A Slider component that allows the user to select a value within a specified range.
 * 
 * @param step Value by which the slider changes on change.
 * @param min Minimum value of the slider.
 * @param max Maximum value of the slider.
 * @param value Current value of the slider.
 * @param updateValue Callback to update the current value of the slider.
 * @param name Name for the alt text of the slider.
 * @returns JSX Element, rendered Slider component.
 */
const Slider: Component<Props> = ({ idx, step, min, max, name, value, setValue }) => {
    const [altText, setAltText] = createSignal(false);

    const divStyle = "relative bottom-5 w-8 flex items-center justify-center";
    const inputStyle = "absolute slider-vertical w-2 left-1/2 transform -translate-x-1/2 h-24";
    const filteredName = name.substring(name.lastIndexOf("\\") + 1)

    // update slider values upon change
    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setValue(idx, Number(target.value));
    };

    return (
        <div class={divStyle}>  
            <input type="range" class={inputStyle} value={value()} min={min} max={max} step={step}
                onInput={handleChange} onmouseenter={() => setAltText(true)} onmouseleave={(() => setAltText(false))} />
            {altText() && <AltText name={filteredName} setAltText={setAltText} />}
        </div>
    )
}

export default Slider;