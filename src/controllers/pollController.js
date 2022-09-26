import {PollSchema} from "../schemas/PoolSchema.js";
import dayjs from "dayjs";
import database from "../database/db.js";
import { ObjectId } from "mongodb";

async function CreatePoll(req, res)
{
    const {title,expireAt} = req.body;
    
        const monthAdd = dayjs().add(30, 'day');
        const newExepireAt = dayjs(monthAdd).format('YYYY-MM-DD HH:mm');     
        
    
    const validation =PollSchema.validate({title,expireAt});
    try{
         if(validation.error)
         {
            const error = validation.error.details.map((detail) => detail.message)
            return res.status(422).send(error)
         }
         if(!validation.error&&!expireAt)
         {
            const pollType_01 = {
                title,
                expireAt:newExepireAt
            };
             await database.collection('polls').insertOne(pollType_01)
            return res.send(pollType_01).status(201);
         }
         if(!validation.error)
         {
            const pollType_02 = {
            title,
            expireAt
             };

            await database.collection('polls').insertOne(pollType_02)
            return res.send(pollType_02).status(201);
         }
    }
    catch(error){
        console.error(error);
        return 'error';
    }
}  

 async function PollView(req, res){
    try {
        const polls = await database.collection('polls').find().toArray();
        return res.send(polls);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
} 
async function PollChoicesView(req, res){
    const id = req.params.id;
    const existingPoll = await database.collection("polls").findOne({_id:ObjectId(id)});
    try {
        const pollChoices = await database.collection('choices').find({pollId:id}).toArray();
        if(!existingPoll)
        {
           return res.status(404).send("Enquete não encontrada")
        }
        return res.send(pollChoices);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
} 

export {CreatePoll,PollView,PollChoicesView}