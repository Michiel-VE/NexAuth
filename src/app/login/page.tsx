'use client';

import React, {useEffect, useState} from 'react';
import {login} from "@/app/api/action/auth";
import Layout from "@/components/layout";

const LoginPage = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await fetch('/api/auth/providers');
            const data = await res.json();

            setProviders(Object.values(data));
        };

        fetchProviders();
    }, []);

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
                    <h1 className="text-2xl text-black font-bold mb-6">Login</h1>
                    <p className="text-gray-600 mb-4">Sign in to access your account</p>

                    {providers.length === 0 ? (
                        <p className="text-black">Loading...</p>
                    ) : (
                        providers.map(({name, id}) => (
                            <button
                                key={id}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
                                onClick={() => login(id)}>
                                Sign in with {name}
                            </button>
                        ))
                    )}

                    <p className="text-sm text-gray-500 mt-4">
                        Don&apos;t have an account? <a href="#" className="text-blue-500">Sign up</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
