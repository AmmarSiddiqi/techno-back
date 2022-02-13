import mongoose from "mongoose";

const connection = await mongoose.connect("mongodb://localhost/test").catch(error=>null);
if(connection) console.log("Successfully Connected with Database");
else if(!connection) console.log("Unable to connect with Database");