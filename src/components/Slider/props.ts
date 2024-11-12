import { Accessor } from "solid-js";

type Props = {
    idx?: number;
    scrollRef?: HTMLDivElement
    step: number;
    min: number;
    max: number;
    name: string;
    dir?: string;
    value: Accessor<number>;
    setValue?: (idx: number, value: number) => void;
    setMasterValue?: (value: number) => void;
}

export interface MasterProps extends Omit<Props, 'idx' | 'setValue'>{
    setValue: (value: number) => void;
}

export default Props;