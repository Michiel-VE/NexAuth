import React from 'react';
import {useSession} from "next-auth/react";
import Image from "next/image";
import Session from "@/interfaces/session";
import User from "@/interfaces/user";

const ProfileCard = () => {
    const {data: session, status} = useSession<Session>();

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-700">You are not signed in.</p>
            </div>
        );
    }

    const user: User = session.user;
    const expires = session.expires;


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <Image
                    width={50} height={50}
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h1 className="text-xl text-black font-semibold mt-4">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-4">
                    Session expires on: {new Intl.DateTimeFormat('en-FI', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date(expires))}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard
