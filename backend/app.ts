import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import routes from "./routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
// app.use("/api", routes);

export default app;
