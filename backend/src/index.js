import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import http from "node:http";
import app from "./app.js";
import connectDatabase from "./db/index.js";
import { connectToSocket } from "./socket/socketManager.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = connectToSocket(server)

connectDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection FAILED ", error);
  });
