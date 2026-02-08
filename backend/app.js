import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import sequelize, { connectDB } from "./utils/database.js";
import messagesRoutes from "./routes/messages.js";

// Initialize environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview task" });
});

app.use("/api/messages", messagesRoutes);

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ success: false, message: message, data: data });
});

// DB Connection
connectDB()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });