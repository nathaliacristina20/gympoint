import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    try {
      const checkPlanExist = await Plan.findOne({
        where: { title: req.body.title },
      });

      if (checkPlanExist) {
        return res.status(400).json({ error: 'Plan already exists.' });
      }

      const { title, duration, price } = await Plan.create(req.body);

      return res.json({
        title,
        duration,
        price,
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  async index(req, res) {
    const plans = await Plan.findAll();
    if (!plans) {
      return res.status(400).json({ error: 'Plans not found.' });
    }
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const plan = await Plan.findOne({
      where: { id: req.params.id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' });
    }

    await plan.update(req.body);

    return res.json({ plan });
  }

  async delete(req, res) {
    const plan = await Plan.findOne({
      where: { id: req.params.id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' });
    }

    await plan.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Record deleted successfully.' });
  }
}

export default new PlanController();
