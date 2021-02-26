import {Router, Request, Response} from 'express'
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanageController from './controllers/OrphanageController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageController.index);

routes.get('/orphanage/:id', OrphanageController.show);

routes.post('/orphanage/create', upload.array('images'), OrphanageController.create);

export default routes;