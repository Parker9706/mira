import express from "express";
import bodyParser from "body-parser";
import { getChatResponse, sendSlackResponse } from "./controller.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/message", async (req, res) => {
  const userRequest = req.body.question;
  const response = await getChatResponse(userRequest);
  await sendSlackResponse(response);
  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
