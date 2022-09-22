import express, { json } from "express";
import cors from "cors";
import CreatePoll from "./controllers/pollController.js";


const app = express();
app.use(cors());
app.use(json());

app.post('/poll',CreatePoll);

app.listen(4000,()=>console.log("servidor rodando na porta 4000"));