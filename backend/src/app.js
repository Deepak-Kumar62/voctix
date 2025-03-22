import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "42kb" }));
app.use(express.urlencoded({ limit: "42kb", extended: "true" }));

import usersRoutes from "./routes/users.routes.js";

app.use("/api/v1/users", usersRoutes);

export default app;
