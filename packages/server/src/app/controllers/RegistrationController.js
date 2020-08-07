import * as Yup from 'yup';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Plan from '../models/Plan';
import Student from '../models/Student';

import Registration from '../models/Registration';
import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    // Verificar se o aluno existe

    const checkStudentExists = await Student.findOne({
      where: { id: req.body.student_id },
    });

    if (!checkStudentExists) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    // Verificar se o plano existe

    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' });
    }

    const planPrice = plan.price;
    const planDuration = plan.duration;

    const { student_id, plan_id } = req.body;

    const startDate = parseISO(req.body.start_date);
    const endDate = addMonths(startDate, planDuration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: startDate,
      end_date: endDate,
      price: planPrice * planDuration,
    });

    await Mail.sendMail({
      to: `${checkStudentExists.name} <${checkStudentExists.email}>`,
      subject: 'Benvindo ao GymPoint!',
      template: 'registration',
      context: {
        student_name: checkStudentExists.name,
        plan_name: plan.title,
        plan_end_date: format(registration.end_date, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        plan_price: plan.price,
      },
    });

    return res.json(registration);
  }

  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    if (!registrations) {
      return res.status(400).json({ error: 'Registrations not found.' });
    }
    return res.json(registrations);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const checkRegistration = await Registration.findOne({
      where: { id: req.params.id },
    });

    if (!checkRegistration) {
      return res.status(400).json({ error: 'Registration not exists.' });
    }

    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' });
    }

    const planPrice = plan.price;
    const planDuration = plan.duration;

    const { plan_id } = req.body;

    const startDate = parseISO(req.body.start_date);
    const endDate = addMonths(startDate, planDuration);

    const registration = await checkRegistration.update({
      plan_id,
      start_date: startDate,
      end_date: endDate,
      price: planPrice * planDuration,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findOne({
      where: { id: req.params.id },
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not exists.' });
    }

    await registration.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Record deleted successfully.' });
  }
}

export default new RegistrationController();
