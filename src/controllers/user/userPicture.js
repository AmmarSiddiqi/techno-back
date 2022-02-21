import { User } from '../../models/user.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import uploadImage from './../../upload/upload.js';

const userPicture = handleRouteErrors(async (req, res) => {
    if(!req.files) return res.status(400).send("File not sent");
    const { image } = req.files;
    if (!image) return res.status(400).send("No Image was provided");
    const { url, id, error } = await uploadImage(image);
    if (error) return res.status(500).send({message: "Error occured while uploading user profile picture",error: error.message});
    const user = await User.findById(req.user._id);
    user.image = { url: url.webContentLink, id };
    await user.save();
    res.status(200).send(url);
})

export default userPicture;