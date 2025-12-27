"use client";
import ActionButtons from "@/components/ActionButtons";
import TimesInput from "@/components/TimesInput";
import UserList from "@/components/UserList";
import { User } from "@/interfaces/user";
import { useState } from "react";

const SUFIX = "/api/v1/users"

export default function MainPage() {
    const [data, setData] = useState<User[]>([])
    const [type, setType] = useState<string | null>(null)
    const [times, setTimes] = useState<number | null>(null)
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const handleSearch = async () => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_QUARKUS}${SUFIX}`)
        if (!resp.ok) {
            throw Error("Something went wrong while listing the users...")
        }

        const users = await resp.json()
        setData(users)
    }

    const handleAction = async () => {
        if (times != null && times <= 0) {
            throw new Error("Times need to be at least one")
        }

        if (type != null && type == "") {
            throw Error("Please decide what action should be taken")
        }

        let message

        if (type == "create") {
            message = {
                type,
                times,
                ids: [],
                user: {
                    username: "Test",
                    age: 18,
                }
            }
            
        } else if (type == "update") {
            message = {
                type,
                times: 1,
                ids: selectedIds,
                user: {
                    username: "updated Test",
                    age: 21,
                }
            }

        } else if (type == "delete") {
            message = {
                type,
                times: 1,
                ids: selectedIds,
                user: {
                    username: "",
                    age: 0,
                }
            }

        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_QUARKUS}${SUFIX}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        
        if (!resp.ok) {
            throw new Error("Failed to send message")
        }
    }

    return (
        <>
            <h1 id="title">User Management</h1>
            <ActionButtons type={type} setType={setType}/>
            <TimesInput times={times} setTimes={setTimes} />
            <UserList
                data={data} 
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                handleSearch={handleSearch}
                handleAction={handleAction}
            />
        </>
    )
}