import { Accessor } from "solid-js";

type Props = {
    idx: number,
    name: string,
    playing: Accessor<boolean>,
    volume: Accessor<number>,
}

export default Props;