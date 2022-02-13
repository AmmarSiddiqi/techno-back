import express from "express";
import importRoutes from "./start/importRoutes.js";
import Server from './start/server.js';
import './start/envConfig.js';
import './start/config.js';
import "./start/connectDb.js";

const app = express();

importRoutes(app);

const server = new Server(app);