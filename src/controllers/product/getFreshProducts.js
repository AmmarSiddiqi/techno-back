import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import * as yup from "yup";

const validate = (body) => {
    const schema = yup.object({
        pageNumber: yup
            .number("\"PageNumber\" must be a number")
            .min(1,"\"PageNumber\" must be more than 1")
            .required("Please provide \"pageNumber\""),
        pageSize: yup
            .number("\"PageSize\" must be a number")
            .min(1,"\"PageSize\" must be more than 1")
            .required("Please provide \"pageSize\"")

    });
    return schema.validate(body);
}

const getFreshProducts = handleRouteErrors(async (req, res) => {
    const { pageNumber, pageSize } = await validate(req.body);
    const products = await Product.find({ isActive: true })
        .select("title price city picture.image1 favourites owner location")
        .populate("location")
        .skip((pageNumber - 1) * pageSize).limit(pageSize);
    return res.status(200).send(products);
})

export default getFreshProducts;