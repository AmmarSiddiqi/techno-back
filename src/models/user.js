import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import { compare } from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true
    },
    email: {
        type: String,
        minLength: 7,
        maxLength: 100,
        required: true
    },
    password: {
        type: String,
        maxLength: 2048,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    verified: {
        type: String,
        maxLength: 2048
    },
    phoneValidationKey: {
        type: String,
        maxLength: 2048
    },
    phoneVerified: {
        type: String,
        maxLength: 2048
    },
    favourites: [{type: mongoose.Schema.Types.ObjectId, ref:"Product"}],
    image: {
        url: { type: String },
        id: { type: String }
    }
});

const validate = (user) => {
    const schema = yup.object({
        name: yup
            .string()
            .min(5, "Name should be more than 5 characters")
            .max(255, "Name cannot be more than 255 characters")
            .required("Please provide a name"),
        email: yup
            .string()
            .min(7, "Email should be more than 7 characters")
            .max(100, "Email cannot be more than 100 characters")
            .required("Please provide an email"),
        password: yup
            .string()
            .min(5)
            .max(28)
            .required("Please provide a password")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                "Password must contain One Uppercase, One Lowercase and one Digit i:e Kitty547"),
        countryCode: yup
            .string()
            .min(2, "Country code must be at least 2 digits")
            .max(4, "Country code cannot be more than 4 digits")
            .required("Country code is required"),
        phoneNumber: yup
            .string()
            .min(9, "Phone Number must be more than 8 Characters")
            .max(16, "Phone Number must be less than 17 Characters")
            .required("Please Provide a phone Number")
    })
    return schema.validate(user);
}

userSchema.methods.genAuthToken = async function () {
    const verified = await compare(process.env.trueSecret,this.verified||"");
    const token = jwt.sign(
        { _id: this._id, name: this.name, email: this.email, verified, verifiedKey: this.verified, 
            countryCode: this.countryCode , phoneNumber: this.phoneNumber }
        , process.env.jwtPrivateKey
    );
    return token;
}

const User = mongoose.model("User", userSchema);

export {
    User,
    validate
};