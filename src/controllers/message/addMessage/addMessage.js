import handleRouteErrors from "../../../handleRouteErrors.js";
import Message from "../../../models/message.js";
import validate from "./validate.js";

const addMessage = handleRouteErrors(async (req, res) => {
	const { message, to } = await validate(req.body);
	const {modifiedCount} = await Message.updateOne({$or: [{idOne: req.user._id, idTwo: to},
		{idOne: to, idTwo: req.user._id}
	]}, {$push: {messages:{by: req.user._id, message}}});
	if(modifiedCount) return res.status(200).send("Message was successfully sent");
	let messages = new Message({idOne: to, idTwo:req.user._id, messages:[{by: req.user._id, message}]});
	await messages.save();
	res.status(200).send("Message was successfully sent");
})

export default addMessage;