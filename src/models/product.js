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
	location: { type: mongoose.Schema.Types.ObjectId, ref:'Location' },
	favourites: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
	lat: {type: String},
	lng: {type: String},
	isActive: {type: Boolean, default:true}
},{timestamps: true})

const validate = product => {
	const schema = yup.object({
		title: yup.string().min(8).max(80).required("Please provide product title"),
		description: yup.string().min(15).max(1000).required("Please provide product description"),
		price: yup.string().required("Please provide product price"),
		category: yup.string().required("Please provide product category"),
		subCategory: yup.string().required("Please provide sub-category for product"),
		location: yup.string().required(),
		picture: yup.object({
			image1: yup.string().required(),
			image2: yup.string(),
			image3: yup.string(),
			image4: yup.string(),
			image5: yup.string(),
		}).nullable(false),
		lat: yup.string().nullable(true),
		lng: yup.string().nullable(true)
	})
	return schema.validate(product)
}

productSchema.index({"title":"text","description":"text"});

const Product = mongoose.model("Product", productSchema);

export { Product, validate }