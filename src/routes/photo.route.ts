import express, { Router } from 'express';
import { PhotoController } from '../modules/photo/photo.controller'


const router: Router = express.Router();
// @ts-ignore
router.get('/photos', PhotoController.getPhotos);
export default router;
 