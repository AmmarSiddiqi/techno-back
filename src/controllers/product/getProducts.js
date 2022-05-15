import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const getProducts = handleRouteErrors(async (req, res) => {
	const { search, pageNumber: pageNo, filters } = req.body;
	if (!pageNo)
		return res.status(400).send("Please provide \"pageNumber\"");
	let pageSize = 10;
	let pageNumber = parseInt(pageNo);
	if (pageNumber < 1) return res.status(400).send("Page Number can't be less than \"1\"");
	if (search) {
		const products = await Product.find({
			"$text": { "$search": search }, isActive: true,
			$and: [
				{ price: { "$gte": filters['Minimum Price'] || Number.NEGATIVE_INFINITY } },
				{ price: { "$lte": filters['Maximum Price'] || Number.POSITIVE_INFINITY } }
			]
		})
			.select("title price city picture.image1 favourites owner location")
			.populate("location")
			.skip((pageNumber - 1) * pageSize).limit(pageSize);
		return res.status(200).send(products);
	}
	const products = await Product.find({
		isActive: true, $and: [
			{ price: { "$gte": filters['Minimum Price'] || Number.NEGATIVE_INFINITY } },
			{ price: { "$lte": filters['Maximum Price'] || Number.POSITIVE_INFINITY } }
		]
	})
		.sort({ [filters['High to Low']]: -1, [filters['Low to High']]: 1 })
		.select("title price city picture.image1 favourites owner location")
		.populate("location")
		.skip((pageNumber - 1) * pageSize).limit(pageSize);

	return res.status(200).send(products);
});

export default getProducts;