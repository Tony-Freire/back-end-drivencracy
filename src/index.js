import express, { json } from "express";
import cors from "cors";
import {CreatePoll,PollChoicesView,PollView} from "./controllers/pollController.js";
import dotenv from "dotenv";
import {CreateChoice} from "./controllers/choiceController.js";
import { RegisterVote, Result } from "./controllers/voteController.js";



dotenv.config();
const PORT =process.env.PORT||5000;
const app = express();
app.use(cors());
app.use(json());

app.post('/poll',CreatePoll);
app.get('/poll',PollView);
app.get('/poll/:id/choice',PollChoicesView);
app.post('/choice',CreateChoice);
app.post('/choice/:id/vote',RegisterVote);
app.get('/poll/:id/result',Result);
app.listen(PORT,()=>console.log(`"servidor rodando na porta ${PORT}`));