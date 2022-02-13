import { Router } from "express";
import getBids from './../controllers/bid/getBids.js';
import addBid from './../controllers/bid/addBid.js';
import deleteBid from './../controllers/bid/deleteBid.js';
import auth from './../middlewares/auth.js';

const bid = Router();

bid.post("/get", auth, getBids);
bid.post("/", auth, addBid);
bid.post("/delete", auth, deleteBid);

export { bid as bidRouter }