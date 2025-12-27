import { User } from "./user"

export interface CreateMessage {
    type: string | undefined | null
    times: number | undefined | null
    user: User
}