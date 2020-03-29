import { isAfter, parseISO, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Registration from '../models/Registration';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;
    // Verificar a matrícula do aluno
    const registration = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (!registration) {
      return res.status(400).json({ message: 'Registration not found.' });
    }
    // Verificar se é uma matrícula ativa
    const { end_date } = registration;
    const checkRegistration = isAfter(parseISO(end_date), new Date());

    if (checkRegistration) {
      return res.status(400).json({ message: 'Registration is not active.' });
    }

    const checkCheckin = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkCheckin.length >= 5) {
      return res.status(400).json({ message: 'You have five checkins.' });
    }

    await Checkin.create({
      student_id,
    });

    return res.json(registration);
  }
}

export default new CheckinController();
