import handleRouteErrors from './../../handleRouteErrors.js';
import Category from './../../models/category.js';

const get = handleRouteErrors(async(req,res) => {
    const categories = await Category.find();
    if(!categories) return res.status(404).send("Categories were not found");
    res.status(200).send(categories);
})

export default get;