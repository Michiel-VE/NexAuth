import { render, screen, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page"; // Adjust import path if necessary
import { login } from '@/app/api/action/auth';
import {fireEvent} from "@testing-library/dom"; // Mock the login function

// Mock the login function
jest.mock('../../src/app/api/action/auth', () => ({
    login: jest.fn(),
}));

// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            google: { id: 'google', name: 'Google' },
            github: { id: 'github', name: 'GitHub' },
        }),
    })
);

describe('Login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render loading state when providers are being fetched', async () => {
        render(<LoginPage />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('Should render provider buttons when loaded', async () => {
        render(<LoginPage />);

        await waitFor(() => expect(screen.getByText('Sign in with Google')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument());
    });

    it('Should call login function when a provider button is clicked', async () => {
        render(<LoginPage />);

        await waitFor(() => screen.getByText('Sign in with Google'));

        fireEvent.click(screen.getByText('Sign in with Google'));

        expect(login).toHaveBeenCalledWith('google');
    });
});
