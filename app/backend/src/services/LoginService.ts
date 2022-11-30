import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import IUser from '../interfaces/users.interface';
import User from '../database/models/User';
import ILogin from '../interfaces/login.interface';

class LoginService {
  public user = new User();
  public jwt = jwt;

  public async login(loginBody: ILogin) {
    const usuario = await User.findOne({
      where: { email: loginBody.email },
    });

    if (usuario) {
      const verificaSenha = compareSync(loginBody.password, usuario.password);

      if (verificaSenha) {
        const { password: _, ...usuarioSemPassword } = usuario.dataValues;
        const token = this.generateToken(usuarioSemPassword);
        return token;
      }
    }

    // if (!verificaSenha) {
    //   throw new HttpException(401, 'Incorrect email or password');
    // } else {
    //   const { password: _, ...usuarioSemPassword } = usuario.dataValues;
    //   const token = this.generateToken(usuarioSemPassword);

    //   return token;
    // }
  }

  private generateToken(user: IUser) {
    const payload = { email: user.email, password: user.password };
    return this.jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }
}

export default LoginService;
