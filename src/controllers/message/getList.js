import handleRouteErrors from "../../handleRouteErrors.js";
import Message from "../../models/message.js";

const getList = handleRouteErrors(async(req,res) => {
    const messages = await Message.find({$or: [
        {idOne: req.user._id},
        {idTwo: req.user._id}
    ]},{messages: {$slice: -1}})
    .populate("idOne","name email image")
    .populate("idTwo", "name email image");
    if(!messages) return res.status(404).send("You haven't sent any messages yet! 😗😗😗");
    res.status(200).send(messages);
})

export default getList;