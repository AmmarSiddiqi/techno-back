import mongoose from "mongoose";
import * as yup from "yup";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 8,
		maxlength: 80,
		required: true,
		index: true
	},
	description: {
		type: String,
		minlength: 15,
		maxlength: 1000,
		required: true,
		index: true
	},
	price: {
		type: Number,
		min: 10,
		max: 100000000000,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	picture: {
		image1: {
			url: String,
			id: String
		},
		image2: {
			url: String,
			id: String
		},
		image3: {
			url: String,
			id: String
		},
		image4: {
			url: String,
			id: String
		},
		image5: {
			url: String,
			id: String
		}
	},
	category: { type: String, required: true },
	subCategory: { type: String, required: true },
	country: { type: String, required: true },
	city: { type: String, required: true },
	favourites: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
})

const validate = product => {
	const imageSchema = yup.object({
		name: yup.string(),
		data: yup.mixed(),
		size: yup.number().max(2000000),
		encoding: yup.string(),
		tempFilePath: yup.string().nullable(),
		truncated: yup.boolean(),
		mimetype: yup.string(),
		md5: yup.string(),
		mv: yup.mixed()
	})
	const schema = yup.object({
		title: yup.string().min(8).max(80).required("Please provide product title"),
		description: yup.string().min(15).max(1000).required("Please provide product description"),
		price: yup.string().required("Please provide product price"),
		owner: yup.string().required(),
		category: yup.string().required("Please provide product category"),
		subCategory: yup.string().required("Please provide sub-category for product"),
		country: yup.string().required("Please provide country for product"),
		city: yup.string().required("Please provide city for product"),
		picture: yup.object({
			image1: imageSchema.required("Please provide product picture"),
			image2: imageSchema,
			image3: imageSchema,
			image4: imageSchema,
			image5: imageSchema,
		}).nullable(false)
	})
	return schema.validate(product)
}

const Product = mongoose.model("Product", productSchema);

export { Product, validate }