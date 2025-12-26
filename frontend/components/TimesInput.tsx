import { Dispatch, SetStateAction } from "react";

export default function TimesInput({
    setTimes
}:{
    setTimes: Dispatch<SetStateAction<number | null>>
}) {
    return (
        <input
            type="number"
            placeholder="how many..."
            onChange={(e) => {
                setTimes(Number(e.target.value))
                console.log("new amount of times: ", Number(e.target.value))
            }}
        />
    );
}