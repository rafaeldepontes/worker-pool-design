import { User } from "@/interfaces/user";

function UserCard({
    user,
    selectedIds,
    setSelectedIds,
}: {
    user: User;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
    if (user.id == null) return null;

    const id = user.id;
    const checked = selectedIds.includes(id);

    const toggle = () => {
        setSelectedIds(prev =>
            checked
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    return (
        <div 
            style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "8px",
            }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={toggle}
            />
            <span><strong>Id:</strong> {id}</span>
            <span><strong>Name:</strong> {user.username}</span>
            <span><strong>Age:</strong> {user.age}</span>
        </div>
    );
}

export default UserCard;
