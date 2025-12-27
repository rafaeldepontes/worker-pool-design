import { User } from "./user"

export interface UpdateMessage {
    type: string | undefined | null
    ids: number[] | undefined | null
    user: User
}