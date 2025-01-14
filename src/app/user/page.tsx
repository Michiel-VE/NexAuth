'use client'

import {SessionProvider} from "next-auth/react";
import ProfileCard from "@/components/profileCard";

const UserProfile = () => {
    return (
        <SessionProvider>
            <ProfileCard/>
        </SessionProvider>
    );
};

export default UserProfile;
