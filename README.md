# Next.js Authentication Project

This project is a **Next.js** application that implements authentication using different third-party providers (such as
Google and GitHub). It includes functionality for logging in and managing user sessions with an easy-to-use interface.
The application allows users to sign in via OAuth providers, and it supports session management using **NextAuth.js**.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Testing](#testing)
- [Linting](#Linting)
- [Pipeline](#Pipeline)

## Project Overview

This project is designed to provide an authentication system that allows users to sign in using third-party OAuth
providers. The login page dynamically fetches available providers and displays a button for each provider (e.g., Google,
GitHub). Upon clicking a provider button, the application initiates the login process with that provider.

The application uses **NextAuth.js** to manage the authentication flow and provide session management. The main features
include:

- Dynamic fetching of OAuth providers
- A login page that lists available providers
- Session management using **SessionProvider** from **NextAuth.js**

## Features

- **Provider-based Authentication**: Users can sign in using popular authentication providers such as Google and GitHub.
- **Session Management**: The application tracks user authentication state using **NextAuth.js**'s `useSession` hook
  and `SessionProvider`.
- **Customizable UI**: The login page renders dynamically based on the available providers.
- **Mockable API for Testing**: The API endpoints and components are easily mockable for testing purposes.
- **Responsive UI**: The application is designed to be responsive, adapting to different screen sizes.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered (SSR) applications.
- **NextAuth.js**: A flexible and easy-to-use authentication library for Next.js apps.
- **React**: A JavaScript library for building user interfaces.
- **Jest**: A testing framework to ensure code quality.
- **React Testing Library**: A testing utility for React components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Michiel-VE/NexAuth.git
cd <project-directory>
```

2. Install dependencies

Install all required dependencies by running:

   ```bash
   npm install
   ```

3. Set up environment variables

This project uses NextAuth.js for authentication. You need to set up the environment variables for it to function
correctly. Create a .env file in the root directory of the project and add the following variables:

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret-key>
PAGE_NAME_BASE="NextJs Auth App"
```

Replace <NEXTAUTH_SECRET> with a secure random value. This key is used to encrypt session cookies.

4. Configure OAuth providers

To integrate third-party OAuth providers like Google and GitHub, you need to set up credentials for each provider. You
can get the credentials from their respective developer platforms:

- [Google Developer Console](https://console.developers.google.com/) - Create a project, enable the Google Sign-In API,
  and get your **Client ID** and **Client Secret**.
- [GitHub Developer Settings](https://github.com/settings/developers) - Create an OAuth app, and get your **Client ID**
  and **Client Secret**.

After obtaining the necessary keys and secrets, add them to the .env file like so:

```dotenv
AUTH_GOOGLE_CLIENT_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>

AUTH_GITHUB_ID=<your-github-client-id>
AUTH_GITHUB_SECRET=<your-github-client-secret>
```

## Running the development server

Once everything is set up, run the development server with the following command:

```bash
npm run dev
```

The server will start, and you can access the application by navigating to http://localhost:3000 in your web browser.

## Testing

To run the tests and ensure everything is working properly, use:

```bash
npm test --> jest --watch
```

This will run all tests and show the results in the terminal.

## Linting

Linting is set up in this project to help maintain code quality and consistency. The project uses **ESLint** for linting
JavaScript and TypeScript files.

### Running Linting

To run linting on the project, execute the following command:

```bash
npm run lint
```

This will check for any linting issues in your code and display them in the terminal. To automatically fix issues that
can be corrected, run:

````bash
npm run lint:fix
````

## Pipeline

### Prerequisites

Ensure that your Next.js project includes Jest and its related dependencies.

Define the jest script in your package.json:

````json
{
  "scripts": {
    "jest": "jest"
  }
}
````

### Workflow Configuration

Workflow Name: Tests for Next.js app

Trigger: Push to the main branch

Environment: Ubuntu 24.04, Node.js 20

### Workflow Steps

1. Checkout code

````bash
uses: actions/checkout@v2
````

2. Setup Nodejs

````bash
uses: actions/setup-node@v2
with:
  node-version: "20"
````

3. Install dependencies

````bash
run: npm install
````

3. Run Jest tests

````bash
run: npm run jest
````