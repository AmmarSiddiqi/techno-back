import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    idOne: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    idTwo: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    messages: []
})

const Message = mongoose.model("Message",messageSchema);

export default Message;