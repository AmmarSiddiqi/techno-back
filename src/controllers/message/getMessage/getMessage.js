import handleRouteErrors from "../../../handleRouteErrors.js";
import Message from "../../../models/message.js";
import validate from "./validate.js";

const getMessage = handleRouteErrors(async (req, res) => {
	const { id } = await validate(req.body);
	const messages = await Message.findOne({_id: id, $or: [
		{idOne:req.user._id},{idTwo:req.user._id}
	]})
	.populate("idOne","name email image")
    .populate("idTwo", "name email image")
	.catch(() => null);
	if (!messages) return res.status(404).send("Apparently you haven't sent any messages");
	res.status(200).send(messages);
})

export default getMessage;