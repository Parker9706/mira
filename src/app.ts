import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Message {
  text: string;
}


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/messages", (req: Request, res: Response) => {
  const message: Message = req.body;
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
