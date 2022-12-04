// server/index.js
const express = require("express");
const mongoose = require('mongoose')
const security=require("./utils/security")

mongoose.connect('mongodb://localhost:27017/project-management-app')

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors')
// parse incoming requests with JSON payloads
app.use(express.json())

app.use(cors())

app.use(security.extractUserfromJwt)

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects")
const taskRoutes = require("./routes/tasks")

app.use("/auth", authRoutes)
app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new NotFoundError())
  })
   
  /** Generic error handler; anything unhandled goes here. */
  app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});