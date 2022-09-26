import {PollSchema} from "../schemas/PoolSchema.js";
import dayjs from "dayjs";
import database from "../database/db.js";
import { ObjectId } from "mongodb";
import { title } from "process";


async function RegisterVote(req, res)
{
    const id = req.params.id;
    const today = dayjs().format('YYYY-MM-DD HH:mm');
    const choice = await database.collection("choices").findOne({_id:ObjectId(id)});
    
    try{
        if(!choice)
        {
            return res.status(404).send("Opção não encontrada");
        }
        const poll = await database.collection('polls').findOne({_id:ObjectId(choice.pollId)});
        
        if(poll.expireAt<today)
        {
            return res.status(403).send("enquete expirada");
        }
        
        
       
        await database.collection("votes").insertOne({
            createdAt: today, 
            choiceId: ObjectId(id), 
    })
        return res.status(201).send("voto registrado com sucesso");
    }
    catch(error)
    {
        console.log(error);
        res.sendStatus(500);
    }
}
async function Result(req,res)
{
    const id = req.params.id;
    const poll = await database.collection('polls').findOne({_id:ObjectId(id)});
    const choices = await database.collection('choices').find({pollId:id}).toArray();
    let dados = choices.map(function(e) { return ObjectId(e._id); } );
    const votes = await database.collection('votes').find({choiceId:{$in:(dados)}}).explain();
    const votedChoices = await database.collection('votes').aggregate([
        {'$match': {choiceId:{$in:(dados)}}},
          {"$group": { 
            _id: "$choiceId",
            count: {
              $sum: 1
            }
          }
}]).toArray();
    
    try{
    
        const winner = votedChoices.reduce(function(prev, current) {
            return (prev.count > current.count) ? prev : current})
        const choiceWinner =  await database.collection('choices').findOne({_id:ObjectId(winner._id)});
        const resultObj=
        { 
            ...poll,
            result : {
                title:choiceWinner.title,
                votes:winner.count
            }

        } 
             
       return res.status(200).send(resultObj);
    }
    catch(error)
    {
        console.log(error);
        res.sendStatus(500);
    }
    
}
export {RegisterVote,Result}