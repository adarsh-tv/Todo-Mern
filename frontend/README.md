MERN Todo App with Authentication

A simple MERN stack Todo application that allows users to sign up, log in, and manage their todos. Each user has their own todos, secured with JWT authentication.


Project Struture
----------------

mern-todo-app/
│── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todo.js
│   ├── server.js
│   └── .env
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Todos.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── ...



Tech Stack

Frontend: React, React Router, Axios, Bootstrap
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT, bcryptjs
Other: dotenv, cors


API Endpoints
🔑 Auth Routes

POST /api/auth/signup → Register new user
POST /api/auth/login → Login user, returns JWT

📝 Todo Routes (Protected: JWT required in Authorization header)

GET /api/todos → Fetch all todos of logged-in user
POST /api/todos → Add new todo
PUT /api/todos/:id → Update todo
DELETE /api/todos/:id → Delete todo

Features

User Signup & Login with JWT authentication
Password hashing using bcryptjs
Add, Edit, Delete, Mark Completed todos
User-specific todos (each user sees only their todos)
