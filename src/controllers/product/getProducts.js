import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const getProducts = handleRouteErrors(async (req, res) => {
	const { search, pageNumber: pageNo } = req.body;
	if (!pageNo)
		return res.status(400).send("Please provide \"pageNumber\"");
	let pageSize = 5;
	let pageNumber = parseInt(pageNo);
	if (pageNumber < 1) return res.status(400).send("Page Number can't be less than \"1\"");
	if (search) {
		const products = await Product.find({"$text":{"$search": search}})
			.select("title price city picture.image1 favourites owner")
			.skip((pageNumber - 1) * pageSize).limit(pageSize);
		return res.status(200).send(products);
	}
	const products = await Product.find()
		.select("title price city picture.image1 favourites owner")
		.skip((pageNumber - 1) * pageSize).limit(pageSize);
	return res.status(200).send(products);
});

export default getProducts;