import { Dispatch, SetStateAction } from "react";

export default function ActionButtons({
  type,
  setType,
}: {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
}) {
  const toggle = (value: string) => setType((prev) => (prev === value ? null : value));

  return (
    <div id="buttons">
      <button
        id="create-button"
        className={type === "create" ? "selected" : ""}
        onClick={() => toggle("create")}
      >
        Create
      </button>

      <button
        id="update-button"
        className={type === "update" ? "selected" : ""}
        onClick={() => toggle("update")}
      >
        Update
      </button>

      <button
        id="delete-button"
        className={type === "delete" ? "selected" : ""}
        onClick={() => toggle("delete")}
      >
        Delete
      </button>
    </div>
  );
}
