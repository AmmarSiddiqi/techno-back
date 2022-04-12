import * as yup from "yup";

const validate = (body) => {
	const schema = yup.object({
		to: yup
			.string("Id has to be a string")
			.required("Id is required!"),
		message: yup
			.string("Message must be a string")
			.min(1, "Why do you want to send empty message? 🤨🤨🤨")
			.max(500, "Woah!! You can't send messages that long! 😗😗😗")
			.required("Message is required!")
	})
	return schema.validate(body);
}

export default validate;