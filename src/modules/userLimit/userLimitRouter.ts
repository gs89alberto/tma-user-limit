import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import userLimitService from './services/userLimitService'
const router = Router();

class UserLimitRouter implements IRouter{
    get routes(){
        router.post('/create', async (req: Request, res: Response) => {
            try {
                const response = await userLimitService.create(req.body);
                res.status(response.status).send(response);
            } catch (err) {
                res.status(err.status).send(err.message);
            }
        });

        router.patch('/progress/:id', async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { progress } = req.body;
                const response = await userLimitService.updateProgress(id, progress);
                res.status(200).send(response);
            } catch (err) {
                res.status(err.status).send(err.message);
            }
        });

        router.patch('/reset/:id', async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const response = await userLimitService.resetProgress(id);
                res.status(200).send(response);
            } catch (err) {
                res.status(err.status).send(err.message);
            }
        });
        return router;
    }
}

export default new UserLimitRouter();