const handleAsync = (callback, ...rest) => {
    return async() => {
        try {
            await callback(...rest);
        } catch (error) {
            console.error(error);
        }
    }
}

export default handleAsync;