import express from "express";
import cors from "cors";


const app = express();
app.use(cors());

app.post('/poll')

app.listen(4000,()=>console.log("servidor rodando na porta 4000"));