import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", process.env.PORT || 8000);
app.use(cors())
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb"  , extended: true}))

app.use("/api/v1/users" ,userRoutes)

app.get("/home", (req, res) => {
  res.json({ hello: "world" });
});

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://srivastavasonam407_db_user:vxiS1nn66xG1cle7@cluster0.pqz0zaa.mongodb.net/",
  );
  console.log(`Mongo Connected DB Host : ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Listenning on port 8000");
  });
};

start();
