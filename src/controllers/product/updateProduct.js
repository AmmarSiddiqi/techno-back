import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import cloudinary from "../../cloudinary/cloudinary.js";

const updateProduct = handleRouteErrors(async(req,res)=>{
    let {_id, title, price, description, picture} = req.body;
    let uploadPics = {}
    Object.keys(picture).map(key => {
        if(typeof picture[key] === "string")
            uploadPics[key] = picture[key]
    })
    const imagesTags = Object.keys(uploadPics);
    for(let i=0; i< imagesTags.length; i++){
        const { url, public_id } = await cloudinary.uploader.upload(uploadPics[imagesTags[i]],
            {
            upload_preset:'dev_setups',
        });
        if(url) picture[imagesTags[i]] = { url, public_id }
        else if(error) 
            return res.status(500).send({message:"There was an error uploading images",error})
    }
    const {modifiedCount} = await Product.updateOne({_id, owner: req.user._id},
        {title, price, description, picture})
    res.status(200).send({message: modifiedCount});
});

export default updateProduct;