import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Registration from '../models/Registration';
import Mail from '../../lib/Mail';
import Student from '../models/Student';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { student_id } = req.params;
    const { question } = req.body;
    // Verificar a matrícula do aluno
    const registration = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (!registration) {
      return res.status(400).json({ message: 'Registration not found.' });
    }

    const helporder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helporder);
  }

  async index(req, res) {
    const helporder = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helporder);
  }

  async show(req, res) {
    const { student_id } = req.params;
    const helporders = await HelpOrder.findAll({
      where: {
        student_id,
      },
    });

    if (helporders.length < 1) {
      return res.json({ error: 'Help Orders not found.' });
    }
    return res.json(helporders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { id } = req.params;

    const helporder = await HelpOrder.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helporder) {
      return res.status(400).json({ message: 'Help Order not exists.' });
    }

    const { answer } = req.body;

    helporder.answer = answer;
    helporder.answer_at = new Date();
    await helporder.save();

    await Mail.sendMail({
      to: `${helporder.student.name} <${helporder.student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'helporder',
      context: {
        student_name: helporder.student.name,
        question: helporder.question,
        answer: helporder.answer,
      },
    });

    return res.json(helporder);
  }
}

export default new HelpOrderController();
