# Notes App Assignment

Welcome to the **Notes App Assignment** repository. This project consists of a full-stack notes application, with separate backend and frontend implementations. Below, you'll find detailed instructions on how to set up and run the project locally, along with deployment details.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)


## Project Structure
The repository consists of two main folders:
- `backend/`: Contains the server-side code.
- `frontend/`: Contains the client-side code.

### Folder Structure:
```
notes-app-assignment/
├── backend/
│   └── notes-app/
│       └── [Backend code]
└── frontend/
    └── notes-app/
        └── [Frontend code]
```

## Getting Started

1. **Git Clone**
   ```bash
   git clone https://github.com/HarshBansal2k01/notes-app-assignment.git
   ```

### Backend Setup

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend/notes-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend/notes-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Environment Variables
The backend server requires a `.env` file to store sensitive details such as the database URI and other configuration settings.
I have added the .env file so that the project can run

**Example `.env` file:**
```
DATABASE_URI=your_database_uri
OTHER_SECRET=your_secret_value
```

## Deployment
The project is deployed and accessible at the following link:
- [DeploymentLink](https://notes-app-assignment-nine.vercel.app/)


---

