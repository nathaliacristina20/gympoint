import jwt from 'jsonwebtoken';

import { promisify } from 'util';

import authConfig from '../../config/auth';

class Auth {
  async autenticator(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');
    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      // entender se é uma boa prática deixar o id aberto no header das rotas
      req.userId = decoded.id;
      req.provider = decoded.provider;
      // req.userId = await bcrypt.hash(toString(decoded.id), 8);
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
  }

  async checkProvider(req, res, next) {
    if (!req.provider) {
      return res.status(401).json({ error: 'User is not provider.' });
    }

    return next();
  }
}

export default new Auth();
