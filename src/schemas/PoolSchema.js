import DateExtension from "@joi/date";
import JoiImport from 'joi';
import  JoiObjectId  from "joi-objectid";


const Joi = JoiImport.extend(DateExtension);
const myObjectId = JoiObjectId(Joi);
const PollSchema = Joi.object({
    title: Joi.string().min(1).required(),
    expireAt: Joi.date().format('YYYY-MM-DD HH:mm')
  
})
const ChoiceSchema = Joi.object({
    title:Joi.string().min(1).required(),
    pollId:myObjectId().required()
})

export {PollSchema, ChoiceSchema}