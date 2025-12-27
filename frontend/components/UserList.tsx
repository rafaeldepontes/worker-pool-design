"use client";
import { User } from "@/interfaces/user";

export default function UserList({
    data,
    handleSearch,
    handleAction,
}:{
    data: User[],
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
                        <hr />
                        <p>Id: {d.id}</p>
                        <p>Name: {d.username}</p>
                        <p>Age: {d.age}</p>
                        <hr />
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