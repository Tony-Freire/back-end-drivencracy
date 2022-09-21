import PollSchema from "./../schemas/PoolSchema.js"

async function CreatePoll(req, res)
{
    const {title,expireAt} = req.body;
    const validation =PollSchema.validate({title,expireAt});
}