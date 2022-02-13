import { Router } from "express";
import changePassword from "../controllers/user/changePassword.js";
import forgotPassword from "../controllers/user/requestPassword.js";
import login from "../controllers/user/login.js";
import signup from "../controllers/user/signup.js";
import verifyEmail from "../controllers/user/verifyEmail.js";
import verifyPhone from "../controllers/user/verifyPhone.js";
import auth from "../middlewares/auth.js";
import userPicture from './../controllers/user/userPicture.js';
import getByEmail from './../controllers/user/getByEmail.js';
import checkPhone from './../controllers/user/checkPhone.js';
import getUser from './../controllers/user/getUser.js';

const user = Router();

user.get("/", auth, getUser);
user.post("/login", login);
user.post("/signup", signup);
user.post("/getByEmail", getByEmail);
user.post("/checkPhone", checkPhone);
user.post("/verifyEmail", auth, verifyEmail);
user.post("/verifyPhone", auth, verifyPhone);
user.post("/forgotPassword", forgotPassword);
user.post("/changePassword", changePassword);
user.post("/uploadImage", userPicture);

export { user as userRouter };