const handleRouteErrors = (callback) => {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            if(error?.name === "ValidationError") 
                res.status(400).send(error.message);
            else if(error?.response?.body?.errors) 
                res.status(error.code).send(error.response.body.errors);
            else if(error?.name === "CastError") 
                res.status(400).send(error.message);
            else
                res.status(500).send(error?.message || error)
        }
    }
}

export default handleRouteErrors;