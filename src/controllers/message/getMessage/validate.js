import * as yup from "yup";

const validate = async (body) => {
	const schema = yup.object({
		id: yup
			.string("id must be a string")
			.required("You must provide user id")
	});
	return schema.validate(body);
}

export default validate;