import DateExtension from "@joi/date";
import JoiImport from 'joi';


const Joi = JoiImport.extend(DateExtension);
const PollSchema = joi.object({
    title: Joi.string().min(1).required(),
    expireAt: Joi.date().format('YYYY-MM-DD HH:mm')
  
})

export {PollSchema}