import express, { json } from "express";
import cors from "cors";
import CreatePoll from "./controllers/pollController.js";
import dotenv from "dotenv";

dotenv.config();
const PORT =process.env.PORT||5000;
const app = express();
app.use(cors());
app.use(json());

app.post('/poll',CreatePoll);

app.listen(PORT,()=>console.log(`"servidor rodando na porta ${PORT}`));