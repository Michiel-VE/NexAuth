'use client'

import React from 'react';
import Nav from "@/components/nav";
import {SessionProvider} from "next-auth/react";

const Layout = ({children}) => {
    return (
        <SessionProvider>
            <Nav></Nav>
            <main>{children}</main>
        </SessionProvider>
    );
};

export default Layout;