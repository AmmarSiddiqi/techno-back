import { User } from '../../models/user.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import cloudinary from "../../cloudinary/cloudinary.js";

const userPicture = handleRouteErrors(async (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).send("No Image was provided");
    const { url, public_id } = await cloudinary.uploader.upload(`${image}`,{
        upload_preset:'dev_setups',
    });
    const user = await User.findById(req.user._id);
    user.image = { url, id: public_id };
    await user.save();
    res.status(200).send({ url, public_id });
})

export default userPicture;