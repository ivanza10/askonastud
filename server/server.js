const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Функция для создания транспорта почты
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
      user: 'ivan.maslakov.99@mail.ru',
      pass: 'RxsEqi5mQQ1F3eQv0M2R',
    },
  });
};

// Эндпоинт для формы стажировки/практики
app.post('/send-email', async (req, res) => {
  const { lastName, firstName, phone, email, direction } = req.body;
  const transporter = createTransporter();

  const mailOptions = {
    from: 'ivan.maslakov.99@mail.ru',
    to: 'ivanza100055@yandex.ru',
    subject: 'Новая заявка на стажировку/практику',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="background-color:rgb(47, 216, 225); color: white; padding: 10px; text-align: center;">Новая заявка</h2>
        <p style="font-size: 16px; margin: 20px 0;">Вы получили новую заявку с сайта. Вот детали:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Фамилия</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${lastName}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Имя</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${firstName}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Телефон</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${phone}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Email</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Направление</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${direction === 'internship' ? 'Стажировка' : direction === 'practice' ? 'Практика' : 'Не указано'}</td>
          </tr>
        </table>
        <p style="font-size: 14px; margin-top: 20px;">Это сообщение было сгенерировано автоматически. Пожалуйста, не отвечайте на него.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email отправлен.');
  } catch (error) {
    console.error('Ошибка отправки почты:', error);
    res.status(500).send('Ошибка отправки почты.');
  }
});

// Эндпоинт для формы школьников
app.post('/send-school-email', async (req, res) => {
  const { name, phone, selectedArea, isInternationalPhone } = req.body;
  const transporter = createTransporter();

  // Получаем название области по ID
  const getAreaName = (areaId) => {
    const areas = {
      'it': 'IT',
      'marketing': 'Маркетинг',
      'design': 'Дизайн',
      'production': 'Производство',
      'management': 'Управление'
    };
    return areas[areaId] || 'Не указано';
  };

  const mailOptions = {
    from: 'ivan.maslakov.99@mail.ru',
    to: 'ivanza100055@yandex.ru',
    subject: 'Новая заявка от школьника',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="background-color:rgb(47, 216, 225); color: white; padding: 10px; text-align: center;">Новая заявка от школьника</h2>
        <p style="font-size: 16px; margin: 20px 0;">Вы получили новую заявку от школьника. Вот детали:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Имя</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Телефон</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${phone} ${isInternationalPhone ? '(международный)' : ''}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Выбранная область</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${getAreaName(selectedArea)}</td>
          </tr>
        </table>
        <p style="font-size: 14px; margin-top: 20px;">Это сообщение было сгенерировано автоматически. Пожалуйста, не отвечайте на него.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email отправлен.');
  } catch (error) {
    console.error('Ошибка отправки почты:', error);
    res.status(500).send('Ошибка отправки почты.');
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
