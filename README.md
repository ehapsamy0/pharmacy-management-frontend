
# Pharmacy Management System - Frontend

This repository contains the **React** frontend for the **Pharmacy Management System**, designed to interface with a Django REST API backend.

### Table of Contents
- [Features](#features)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation and Running](#installation-and-running)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Role-Based Access**: Conditional rendering based on user roles (Patient, Pharmacist).
- **Refill Requests**: Patients can request medication refills; pharmacists can view and manage refill requests.
- **Responsive Design**: Utilizes Material-UI for a user-friendly, responsive interface.
- **Persistent State**: Uses local storage to store access tokens for session persistence.

---

## API Documentation

The React frontend interacts with a Django REST API, with full documentation available at:

[API Documentation](http://54.93.64.211:8000/api/docs/)

This provides details on each endpoint, request/response structures, and authentication requirements.

---

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- Access to the backend API at `http://54.93.64.211:8000/api`.

### Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```dotenv
# API Base URL
REACT_APP_API_URL=http://54.93.64.211:8000/api
```

This `.env` file ensures the React app correctly points to the backend API.

---

## Installation and Running

### Local Installation (Without Docker)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pharmacy-management-frontend.git
   cd pharmacy-management-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser.

### Docker Setup

To run the project using Docker, use the following commands:

1. **Build the Docker image**:
   ```bash
   docker build -t pharmacy-frontend .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 3000:80 pharmacy-frontend
   ```

The app will now be accessible at `http://localhost:3000`.

---

## Project Structure

```plaintext
pharmacy-management-frontend/
├── public/
│   ├── index.html           # Main HTML file
│   ├── logo192.png          # App icons
│   ├── logo512.png
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # Instructions for web crawlers
├── src/
│   ├── api/
│   │   └── axiosInstance.js  # Axios instance setup for API calls
│   ├── components/           # Reusable components
│   │   ├── Layout.js
│   │   ├── MedicationList.js
│   │   ├── Navbar.js
│   │   ├── PendingRefillRequests.js
│   │   └── RefillRequestForm.js
│   ├── pages/                # Page components for different routes
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── App.css               # App-specific styles
│   ├── App.js                # Main app component
│   ├── App.test.js           # Tests for the App component
│   ├── index.css             # Global styles
│   ├── index.js              # Entry point for React
│   ├── logo.svg              # React logo
│   ├── reportWebVitals.js    # Performance monitoring
│   ├── setupTests.js         # Jest setup file
│   └── theme.js              # Theme configuration for Material-UI
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker configuration for the React app
├── package-lock.json         # Lockfile for dependencies
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Remove the single build dependency and allow custom configurations (irreversible).

---

## Docker Setup

This project includes a `Dockerfile` and `docker-compose.yml` to run the app in a Docker container.

### Docker Compose (Optional)

To use `docker-compose` for a simpler setup, you can run:

```bash
docker-compose up --build
```

This will build and run the container as configured in `docker-compose.yml`.

---

## Troubleshooting

1. **API Connectivity Issues**:
   - Ensure the backend API URL is correctly set in the `.env` file.
   - Check if the backend API server is up and accessible at `http://54.93.64.211:8000`.

2. **Docker Issues**:
   - Run `docker logs <container_id>` to check the logs for any errors.
   - Use `docker-compose down` to stop and remove containers, and try rebuilding with `docker-compose up --build`.

---

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow to submit issues and pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` should provide a comprehensive overview and setup instructions for the React project.