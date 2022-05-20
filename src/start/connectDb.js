import mongoose from "mongoose";

const connection = await mongoose.connect(`${process.env.MONGO_URI}`,{ignoreUndefined: true}).catch(error=>null);
if(connection) console.log("Successfully Connected with Database");
else if(!connection) console.log("Unable to connect with Database");