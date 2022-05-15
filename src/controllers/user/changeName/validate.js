import * as yup from 'yup';

const validate = (body) => {
    const schema = yup.object({
        name: yup
        .string("We're having trouble updating your name")
        .min(5, "You're name can't be less than 5 characters")
        .max(255, "Your name can't be more than 255 characters")
        .required("You didn't provide any name")
    })

    return schema.validate(body);
}

export default validate;