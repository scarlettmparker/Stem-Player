import { Accessor } from "solid-js";

type Props = {
    index: number,
    name: string,
    playing: Accessor<boolean>,
    volume: Accessor<number[]>,
}

export default Props;