import express, { json } from "express";
import cors from "cors";
import {CreatePoll,PollView} from "./controllers/pollController.js";
import dotenv from "dotenv";
import {CreateChoice} from "./controllers/choiceController.js";


dotenv.config();
const PORT =process.env.PORT||5000;
const app = express();
app.use(cors());
app.use(json());

app.post('/poll',CreatePoll);
app.get('/poll',PollView);
app.post('/choice',CreateChoice);
app.listen(PORT,()=>console.log(`"servidor rodando na porta ${PORT}`));