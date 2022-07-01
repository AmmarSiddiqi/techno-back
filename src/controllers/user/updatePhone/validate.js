import * as yup from "yup";

const validate = body => {
    const schema = yup.object({
        countryCode: yup
            .number().min(10).max(92).required(),
        phoneNumber: yup
            .number().min(1000000000).max(9999999999).required()
    })

    return schema.validate(body);
}

export default validate;