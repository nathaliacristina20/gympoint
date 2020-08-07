import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionControler {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      await schema.validate(req.body).catch(err => {
        return res.status(400).json({ error: err.message });
      });

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'User not found.' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match.' });
      }

      const { id, name, provider } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id, provider }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json('erro');
    }
  }
}

export default new SessionControler();
