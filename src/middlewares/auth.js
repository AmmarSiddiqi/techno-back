import jwt from "jsonwebtoken";

const auth = async(req,res,next) => {
    const token = req.header("auth-token");
    if(!token) return res.status(403).send("Forbidden");
    try {
        const user = jwt.verify(token,process.env.jwtPrivateKey);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).send("Forbidden");
    }
};

export default auth;