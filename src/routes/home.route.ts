import express, { Router, Response } from 'express';

const home = (res: Response) => {
    res.send({
        message: "Kindly visit `/photos` route to get the paginated list of photos"
    });
}

const router: Router = express.Router();
router.get('/', home)
export default router;
 