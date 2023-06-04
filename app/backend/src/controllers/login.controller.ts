import { Request, Response } from 'express';
import LoginService from '../services/login.service';

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

  public loginValidate = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    const user = await this.loginService.loginValidate(token as string);
    // console.log({ controller: user });

    if (user) {
      return res.status(200).json({ role: user.role });
    }
  };
}

export default LoginController;
