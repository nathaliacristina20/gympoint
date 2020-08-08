export default {
  host: process.env.MAIL_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  default: {
    from: 'Equipe GymPoint <noreply@gympoint.com>',
  },
};

/* Amazon SES, Mailgun, Sparkpost, Mandril */
