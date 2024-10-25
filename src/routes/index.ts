import photoRoute from './photo.route';
import express, { Router } from 'express'
import homeRoute from './home.route';

const router = express.Router();

interface IRoute {
    path: string;
    route: Router;
  }
  
  const defaultIRoute: IRoute[] = [
    {
      path: '/photos',
      route: photoRoute,
    },
    {
      path:"/",
      route: homeRoute
    }
  ];
  defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
export default router;
  