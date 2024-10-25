import express, { Router } from 'express';
import { getPhotos } from '../modules/photo/photo.controller'


const router: Router = express.Router();
router.get('/', getPhotos);
export default router;
 