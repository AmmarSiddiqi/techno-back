import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    city: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    iso2: { type: String }
})

const Location = mongoose.model('Location', locationSchema);

export default Location;