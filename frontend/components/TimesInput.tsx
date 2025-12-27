import { Dispatch, SetStateAction } from "react";

export default function TimesInput({
  times,
  setTimes,
}: {
  times: number | null;
  setTimes: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <input
      type="number"
      placeholder="how many..."
      min={1}
      value={times ?? ""}
      onChange={(e) => {
        const val = e.target.value === "" ? null : Number(e.target.value);
        setTimes(val);
        console.log("new amount of times: ", val);
      }}
    />
  );
}