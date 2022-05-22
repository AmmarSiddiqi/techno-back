import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import * as yup from "yup";

const validate = (body) => {
    const schema = yup.object({
        category: yup
            .string()
            .required(),
        city: yup
            .string()
            .nullable()
    })
    return schema.validate(body);
}

const getCategoryWise = handleRouteErrors(async(req,res) => {
    const { category, city } = await validate(req.params);
    const findQuery = city !== 'undefined' ? {isActive: true, category, location:city}:{isActive: true,category}
    const products = await Product
        .find(findQuery)
        .select("title price city picture.image1 favourites owner location")
		.populate("location")
        .limit(5);
    res.status(200).send(products);
})

export default getCategoryWise;