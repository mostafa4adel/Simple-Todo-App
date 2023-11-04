
# Todo App

This is a simple Todo app created using Expo and Node.js. It allows you to create, update, and delete tasks in a to-do list. This project is a great starting point for learning how to build mobile applications with Expo and a Node.js backend.

## Features

- Create new tasks.
- Edit existing tasks.
- Mark tasks as completed.
- Delete tasks.
- View your list of tasks.

## Prerequisites

Before you get started, make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client)
- Your favorite code editor.
- [PostgreSQL](https://www.postgresql.org/download/) - Ensure you have PostgreSQL installed on your system as it's required for the project's database.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   ```

2. Change into the project directory:

   ```bash
   cd Simple-Todo-App
   ```

3. Install the server dependencies:

   ```bash
   cd ./backend
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd ./frontend-app
   npm install
   ```

## Usage

### Starting the Server

1. Go to the `server` directory:

   ```bash
   cd ./backend
   ```

2. Start the Node.js server:

   ```bash
   npm start
   ```

The server should now be running at http://localhost:3006.

### Running the Expo Client

1. Go to the `client` directory:

   ```bash
   cd ./frontend-app
   ```

2. Start the Expo client:

   ```bash
   expo start
   ```

3. Open the Expo Go app on your mobile device, scan the QR code, and you'll be able to use the Todo app.
