import joi from "joi";

const PollSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.string().min(0).required()
  
})

export {PollSchema}