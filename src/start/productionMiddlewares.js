import helmet from "helmet";
import compression from "compression";

const productionMiddlewares = (app) => {
    app.use(helmet())
    app.use(compression());
}

export default productionMiddlewares;