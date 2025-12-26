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
            <div>
                <button onClick={() => handleSearch()}>Search</button>
                {data.map((d) => {
                    return (
                        <div key={d.id}>
                            <p>{d.username}</p>
                        </div>
                    )
                })}
            </div>

            <button onClick={() => handleAction()}>SEND</button>
        </>
    );
}