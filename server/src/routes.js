import { Router } from 'express';

import { next } from 'sucrase/dist/parser/tokenizer';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', SessionController.store);

routes.use(auth.autenticator);

routes.post('/students/:student_id/checkins', CheckinController.store);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:id/answer', HelpOrderController.update);
routes.get('/students/:student_id/help-orders', HelpOrderController.show);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(auth.checkProvider);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

export default routes;
