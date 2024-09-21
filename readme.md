
---

# Taskify

This is a task management application built with Next.js for the frontend and Express.js for the backend.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Saurav-Pant/Taskify.git
   cd Taskify
   ```

2. **Frontend (Client) Setup:**

   - Navigate to the client directory:

     ```bash
     cd client
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

    - **Configure Environment Variables:**

     - Rename `.env.example` file to `.env`:

       ```bash
       cp .env.example .env
       ```


   - Start the frontend server:

     ```bash
     npm run dev
     ```

   The frontend will run on `http://localhost:3000`.

3. **Backend (Server) Setup:**

   - Navigate to the server directory:

     ```bash
     cd ../server
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - **Configure Environment Variables:**

     - Rename `.env.example` file to `.env`:

       ```bash
       cp .env.example .env
       ```

     - Add your MongoDB URI to the `.env` file:

       ```
       DATABASE_URL=<your-mongo-uri>
       ```

   - Build the TypeScript code:

     ```bash
     tsc -b
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

   The backend will run on `http://localhost:3002`.


If you are familiar with Docker, you can run this using Docker as well. 

---

### Prerequisites

Ensure you have the following installed before proceeding:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

Start by cloning the project repository:

```bash
git clone https://github.com/Saurav-Pant/Taskify.git
cd Taskify
```

### 2. Update Environment Variables

There are environment variable files for both the client and server. To set these up:

1. Navigate to the `client/` and `server/` directories.
2. Rename the `.env.example` files to `.env` for both the client and server:

```bash
# For client
mv client/.env.example client/.env

# For server
mv server/.env.example server/.env
```

3. Update the `.env` files with appropriate values (e.g., `DATABASE_URL`).

### 3. Ensure Docker Daemon is Running

Before starting the Docker containers, make sure the Docker daemon is running. You can verify this by running:

```bash
docker info
```

If Docker is not running, start the Docker service.

### 4. Run the Docker Containers

Once the environment variables are set and Docker is running, use Docker Compose to start the project:

```bash
docker-compose up --build
```

This will build the necessary Docker images and start both the client and server containers.

### 5. Access the Application

- The client application should be accessible at [http://localhost:3000](http://localhost:3000).
- The server API should be accessible at [http://localhost:3002](http://localhost:3002).

### 6. Shutting Down the Application

To stop the containers, run the following command:

```bash
docker-compose down
```

This will stop and remove the containers but leave the images and volumes intact.
  
---
