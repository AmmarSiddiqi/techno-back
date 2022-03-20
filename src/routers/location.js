import express from "express";
import getAll from './../controllers/location/getAll.js';

const router = express.Router();

router.get("/", getAll);

export { router as locationRouter }