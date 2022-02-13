import dotenv from "dotenv";

const { NODE_ENV } = process.env;
dotenv.config({ debug: true, path: `.env.${NODE_ENV.trim()}` })