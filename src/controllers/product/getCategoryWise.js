import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import * as yup from "yup";

const validate = (body) => {
    const schema = yup.object({
        category: yup
            .string()
            .required()
    })
    return schema.validate(body);
}

const getCategoryWise = handleRouteErrors(async(req,res) => {
    const { category } = await validate(req.params);
    const products = await Product
        .find({category})
        .select("title price city picture.image1 favourites owner location")
		.populate("location")
        .limit(5);
    res.status(200).send(products);
})

export default getCategoryWise;