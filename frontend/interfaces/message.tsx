import { User } from "./user"

export interface Message {
    type: string | undefined | null
    times: number | undefined | null
    user: User
}