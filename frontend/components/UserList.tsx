"use client";
import { User } from "@/interfaces/user";
import UserCard from "./UserCard";

export default function UserList({
    data,
    selectedIds,
    setSelectedIds,
    handleSearch,
    handleAction,
}:{
    data: User[],
    selectedIds: number[],
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>,
    handleSearch: () => Promise<void>,
    handleAction: () => Promise<void>,
}) {

    return (
        <>
            <div className="controls-row" id="buttons">
                <button onClick={() => handleSearch()}>Search</button>
            </div>

            <div className="scroll-box" role="list" aria-label="users-list">
                {data.length === 0 ? (
                    <p className="without-user-row">No users</p>
                ) : (
                    data.map((d) => (
                        <div key={d.id} className="user-row">
                            <UserCard
                                key={d.id}
                                user={d}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                            />
                        </div>
                    ))
                )}
            </div>

            <div className="send-row" id="buttons">
                <button onClick={() => handleAction()}>Send</button>
            </div>
        </>
    );
}