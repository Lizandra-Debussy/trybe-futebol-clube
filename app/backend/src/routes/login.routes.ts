import { Router } from 'express';
import loginValidate from '../middlewares/loginValidation';
import LoginController from '../controllers/login.controller';

const router = Router();
const loginController = new LoginController();

router.get('/validate', loginController.loginValidate);
router.post('/', loginValidate, loginController.login);

export default router;
