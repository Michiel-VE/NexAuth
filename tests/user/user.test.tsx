import {useSession} from "next-auth/react";
import {render, screen} from "@testing-library/react";
import ProfileCard from "@/components/profileCard";
import User from "@/interfaces/user";
import Session from "@/interfaces/session";

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

const user: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: '/profile.jpg'
}

const data: Session = {
    user: user,
    expires: '2025-01-01T00:00:00Z',

}


describe('User', () => {
    it('Should display loading state when status is loading', () => {
        useSession.mockReturnValue({status: 'loading'});

        render(<ProfileCard/>);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('Should display not signed in state when session.ts is empty', () => {
        useSession.mockReturnValue({session: null});

        render(<ProfileCard/>);

        expect(screen.getByText('You are not signed in.')).toBeInTheDocument();
    });

    it('Should display not signed in state when session.ts is empty', () => {
        useSession.mockReturnValue({session: null});

        render(<ProfileCard/>);

        expect(screen.getByText('You are not signed in.')).toBeInTheDocument();
    });

    it('Should display user info', () => {
        useSession.mockReturnValue({
            status: 'authenticated',
            data: data
        });

        render(<ProfileCard/>);

        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByAltText(user.name + '\'s profile')).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', user.image);
        expect(screen.getByText('Session expires on: ' + new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(data.expires)))).toBeInTheDocument();

    });


})