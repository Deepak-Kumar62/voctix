import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "42kb" }));
app.use(express.urlencoded({ limit: "42kb", extended: "true" }));


app.get("/home", (req, res) => {
  res.send("Hello world!");
});

export default app;
