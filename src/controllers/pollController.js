import {PollSchema} from "../schemas/PoolSchema.js";
import dayjs from "dayjs";
import database from "../database/db.js";

async function CreatePoll(req, res)
{
    const {title,expireAt} = req.body;
    
        const newExpire = dayjs().add(30, 'day');
        const newExepireAt = dayjs(newExpire).format('YYYY-MM-DD HH:mm');     
        
    
    const validation =PollSchema.validate({title,expireAt});
    try{
         if(validation.error)
         {
            const error = validation.error.details.map((detail) => detail.message)
            return res.status(422).send(error)
         }
         if(!validation.error&&!expireAt)
         {
            database.collection('polls').insertOne({
                title,
                newExepireAt
            })
            return res.send({title,newExepireAt}).status(201);
         }
         if(!validation.error)
         {
            database.collection('polls').insertOne({
                title,
                expireAt
            })
            return res.send({title,expireAt}).status(201);
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
export {CreatePoll,PollView}