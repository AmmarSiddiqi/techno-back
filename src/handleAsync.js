const handleAsync = (callback) => {
    return async(...args) => {
        try {
            await callback(...args);
        } catch (error) {
            console.error(error);
        }
    }
}

export default handleAsync;