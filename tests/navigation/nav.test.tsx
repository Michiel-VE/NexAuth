import {SessionProvider, useSession} from "next-auth/react";
import {render, screen} from "@testing-library/react";
import Navigation, {Nav} from "@/components/nav";
import {fireEvent} from "@testing-library/dom";
import {logout} from "@/app/api/action/auth";
import User from "@/interfaces/user";
import Session from "@/interfaces/session";

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('../../src/app/api/action/auth', () => ({
    logout: jest.fn(),
}));

describe('Navigation', () => {
    const user: User = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: '/profile.jpg'
    }

    const data: Session = {
        user: user,
        expires: '2025-01-01T00:00:00Z',

    }
    it('Should display signIn button when not signed in', () => {
        useSession.mockReturnValue({data: null});

        render(<Nav/>)

        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Sign In').closest('a')).toHaveAttribute('href', '/login')

    })

    it('Should display signOut button when signed in', () => {
        useSession.mockReturnValue({data: data});

        render(<Nav/>)

        expect(screen.getByText('Sign Out')).toBeInTheDocument();
        expect(screen.getByText('Sign Out').closest('a')).toHaveAttribute('href', '/')
    })

    it('Should call logout when signOut button is clicked', () => {
        useSession.mockReturnValue({data: data});

        render(<Nav/>)

        const signOutLink = screen.getByText('Sign Out');

        fireEvent.click(signOutLink)

        expect(logout).toHaveBeenCalled()
    })
})