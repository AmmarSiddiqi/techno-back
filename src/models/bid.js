import mongoose from "mongoose";
import * as yup from "yup";

const bidSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: { type: Number },
    at: { type: Date, default: Date.now },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Bid = mongoose.model("Bid",bidSchema);

const validate = (bid) => {
    const schema = yup.object({
        price: yup.number().required(),
        productId: yup.string().required()
    });
    return schema.validate(bid)
}

export {
    Bid, validate
}