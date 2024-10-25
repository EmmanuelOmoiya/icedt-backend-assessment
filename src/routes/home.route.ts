import express, { Router, Response, Request } from 'express';

const home = (req:Request, res: Response) => {
    res.json({
        message: "Kindly visit `/photos` route to get the paginated list of photos"
    });
}

const router: Router = express.Router();
router.get('/', home)
export default router;
 