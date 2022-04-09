import { Router } from "express";
import getMessage from "../controllers/message/getMessage.js";
import addMessage from "../controllers/message/addMessage/addMessage.js";
import getList from "../controllers/message/getList.js";
import verification from "../middlewares/verification.js";
import auth from "../middlewares/auth.js";

const message = Router();

message.post("/add", auth, verification, addMessage);
message.get("/getList", auth, verification, getList);
message.post("/get", auth, verification, getMessage);

export { message as messageRouter }