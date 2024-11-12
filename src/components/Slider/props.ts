import { Accessor } from "solid-js";

type Props = {
    idx: number;
    step: number;
    min: number;
    max: number;
    name: string;
    value: Accessor<number>;
    setValue: (idx: number, value: number) => void;
}

export default Props;