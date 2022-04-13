import dotenv from "dotenv";

const { NODE_ENV } = process.env;
NODE_ENV.trim() === "development" ?
dotenv.config({ debug: true, path: `.env.${NODE_ENV.trim()}` })
: dotenv.config();