import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subCategories: { type: Array, required: true, minlength: 1 }
});

const Category = mongoose.model('category',categorySchema);

export default Category;