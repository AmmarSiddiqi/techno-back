import { compare } from "bcrypt";

const verification = async(req,res,next) => {
    try {
        const { trueSecret } = process.env;
        const verified = await compare(trueSecret, req.user.verifiedKey);
        if(!verified) return res.status(403).send("You need to verify your account to proceed");
        next();
    } catch (error) {
        res.status(403).send("You need to verify your account to proceed")
    }
}

export default verification;