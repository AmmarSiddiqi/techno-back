import { Router } from "express";
import getBids from './../controllers/bid/getBids.js';
import addBid from './../controllers/bid/addBid.js';
import deleteBid from './../controllers/bid/deleteBid.js';
import auth from './../middlewares/auth.js';
import verification from './../middlewares/verification.js';

const bid = Router();

bid.post("/get", auth, verification, getBids);
bid.post("/", auth, verification, addBid);
bid.post("/delete", auth, verification, deleteBid);

export { bid as bidRouter }