# Live Polling System

A real-time polling application designed for teachers and students, built with React, Redux, Express.js, Socket.io, and MongoDB. This system allows teachers to create polls, view live results, and manage students, while students can submit answers and view results. The application uses environment variables for configuration and includes a chat feature for interaction.

## Features

### Must-Haves
- Functional polling system with teacher and student personas.
- Teachers can create polls and view live results.
- Students can submit answers and view poll results.
- Real-time updates powered by Socket.io.

## Prerequisites
- Node.js and npm installed.
- MongoDB (local or MongoDB Atlas) running.
- Internet connection for dependencies.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/live-polling-system.git
cd live-polling-system
```

## 2. Set Up Environment Variables

Create a `.env` file in the `server` directory with the following:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/polling_system
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/polling_system?retryWrites=true&w=majority
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 3. Install Dependencies

**Server:**

```bash
cd server
npm install
```

**Client:**

```bash
cd ../client
npm install
```

---

## 4. Run the Application

**Start the server:**

```bash
cd server
node src/index.js
```

**Start the client:**

```bash
cd ../client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Use multiple tabs to simulate teacher and student roles.

---

## Usage

**Teacher:**  
Select **"I'm a Teacher"** to access the dashboard. Create a poll with a question, options, and timer. View live results and kick students if needed.

**Student:**  
Select **"I'm a Student"**, enter a unique name, and submit answers to active polls within the timer. View results after submission or timeout.

**Chat:**  
Open the chat popup in either dashboard to send and receive messages.

## 🛠️ Technologies Used

**Frontend:**  
React, Redux, TailwindCSS

**Backend:**  
Express.js, Socket.io, MongoDB, Mongoose

**Development Tools:**  
Vite (for client), `dotenv` for managing environment variables

---

## ⚙️ Configuration

- Update the `MONGO_URI` in your `.env` file to point to your MongoDB instance.
- Modify `CORS_ORIGINS` in `.env` to match your local or production frontend URLs.

