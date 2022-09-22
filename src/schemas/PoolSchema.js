import joi from "joi";

const PollSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.date().allow("").allow(null)
  
})

export {PollSchema}