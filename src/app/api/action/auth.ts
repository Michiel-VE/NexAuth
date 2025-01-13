import {signIn, signOut} from "next-auth/react";

const login = async (provider: string) => {
    await signIn(provider, {callbackUrl: '/user'})
}

const logout = async () => {
    await signOut({ redirect: false });
    await signOut({callbackUrl: '/'})
};

export {login, logout}