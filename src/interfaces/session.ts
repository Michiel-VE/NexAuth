import User from "@/interfaces/user";

interface Session {
    user: User,
    expires: string
}

export default Session