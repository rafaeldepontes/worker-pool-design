import { Dispatch, SetStateAction } from "react";

export default function ActionButtons({
    setType
}:{
    setType: Dispatch<SetStateAction<string | null>>
}) {
    return (
        <div id="buttons">
            <button id="create-button" onClick={() => {
                console.log("create button clicked")
                setType("create")
            }}>CREATE</button>
            <button id="update-button" onClick={() => {
                console.log("update button clicked")
                setType("update")
            }}>UPDATE</button>
            <button id="delete-button" onClick={() => {
                console.log("delete button clicked")
                setType("delete")
            }}>DELETE</button>
        </div>
    );
};