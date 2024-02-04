import { Router } from 'express';
import { IRouter } from './router.interface';
import userLimitRouter from './userLimit/userLimitRouter'

const router = Router();

class BaseRouter implements IRouter{
    get routes(){
        router.use('/userLimit', userLimitRouter.routes);
        return router;
    }
}

export default new BaseRouter();