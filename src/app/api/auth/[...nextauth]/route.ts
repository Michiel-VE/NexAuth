import NextAuth from 'next-auth';
import {authOptions} from '@/config/auth';
import {getProviders} from 'next-auth/react';

const handler = NextAuth(authOptions);

export async function GET() {
    const providers = await getProviders();

    return new Response(JSON.stringify(providers), {
        headers: {'Content-Type': 'application/json'},
    });
}

export {handler as GET, handler as POST};
