import handleRouteErrors from './../../handleRouteErrors.js';
import Location from './../../models/location.js';

const getAll = handleRouteErrors(async(req,res) => {
    const locations = await Location.find();
    res.status(200).send(locations);
})

export default getAll;