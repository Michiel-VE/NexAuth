'use client';

import {logout} from "@/app/api/action/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Next Auth App</Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    {session && (
                            <Link href="/user" className="hover:text-gray-300">{session.user.name}</Link>
                    )}
                    <li>
                        <Link href={session ? '/': '/login'}
                             onClick={() => session ? logout() : ''}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                            {session ? 'Sign Out' : 'Sign In'}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
