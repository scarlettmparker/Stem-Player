import { Accessor } from "solid-js";

type Props = {
    idx: number,
    name: string,
    master: Accessor<number>,
    playing: Accessor<boolean>,
    volume: Accessor<number>
}

export default Props;