import {PollSchema} from "../schemas/PoolSchema.js";
import dayjs from "dayjs";
import database from "../database/db.js";

export default async function CreatePoll(req, res)
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
            return res.send(newExepireAt);
         }
         if(!validation.error)
         {
            database.collection('polls').insertOne({
                title,
                expireAt
            })
            return res.send({title,expireAt});
         }
    }
    catch(error){
        console.error(error);
        return 'error';
    }
    return res.send(console.log("foi"));
}  
