import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  private loginService = new LoginService();

  public login = async (req: Request, res: Response) => {
    const { body } = req;

    const token = await this.loginService.login(body);

    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    return res.status(200).json({ token });
  };
}

export default LoginController;
