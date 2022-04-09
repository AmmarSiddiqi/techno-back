import handleRouteErrors from "../../handleRouteErrors.js";
import Message from "../../models/message.js";
import * as yup from "yup";

const validate = async (body) => {
	const schema = yup.object({
		id: yup
			.string("id must be a string")
			.required("You must provide user id")
	});
	return schema.validate(body);
}

const getMessage = handleRouteErrors(async (req, res) => {
	const { id } = await validate(req.body);
	const messages = await Message.findOne({_id: id, $or: [
		{idOne:req.user._id},{idTwo:req.user._id}
	]}).catch(() => null);
	if (!messages) return res.status(404).send("Apparently you haven't sent any messages");
	res.status(200).send(messages);
})

export default getMessage;