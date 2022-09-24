import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import database from "../database/db.js";
import { ChoiceSchema } from "../schemas/PoolSchema.js";


async function CreateChoice(req,res)
{
   const choice = req.body; 
   const today = dayjs().format('YYYY-MM-DD HH:mm');
   const validation = ChoiceSchema.validate(choice);
   const existingPoll = await database.collection("polls").findOne({_id:ObjectId(choice.pollId)});
   const titleExists = await database.collection("choices").findOne({ title:{ $regex: choice.title, $options: 'i' } });
   try{
    if(validation.error)
         {
            const error = validation.error.details.map((detail) => detail.message)
            return res.status(422).send(error)
         }
     if(!existingPoll)
     {
        return res.status(404).send("enquete não encontrada");
     }
     if(existingPoll.expireAt<today)
     {
        return res.status(403).send("data da enquete expirada");
     }
     if(titleExists)
     {
        return res.status(409).send("Já existe uma opção com esse nome");
     }
     database.collection('choices').insertOne(choice)       
        return res.status(201).send(choice)
    }
   catch(error)
   {console.error(error);
    return 'error';}
}
export {CreateChoice};