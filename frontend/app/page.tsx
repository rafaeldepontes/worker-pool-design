"use client";
import ActionButtons from "@/components/ActionButtons";
import TimesInput from "@/components/TimesInput";
import UserList from "@/components/UserList";
import { User } from "@/interfaces/user";
import { useState } from "react";

const SUFIX = "/api/v1/users"

export default function MainPage() {
    const [type, setType] = useState<string | null>(null)
    const [times, setTimes] = useState<number | null>(null)
    const [data, setData] = useState<User[]>([])

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

        const message = {
            type,
            times,
            user: {
                username: "Rafael",
                age: 23,
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
            <h1>User Management</h1>
            <ActionButtons setType={setType}/>
            <TimesInput setTimes={setTimes} />
            <UserList
                data={data} 
                handleSearch={handleSearch}
                handleAction={handleAction}
            />
        </>
    )
}