type Props = {
    index: number;
    step: number;
    min: number;
    max: number;
    values: number[];
    updateValue: (value: number[]) => void;
    name: string;
}

export default Props;