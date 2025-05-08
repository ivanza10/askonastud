const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка CORS
app.use(cors({
  origin: ['https://askonastud.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// Обслуживание статических файлов из директории front/dist
app.use(express.static(path.join(__dirname, '../front/dist')));

// Функция для создания транспорта почты
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Эндпоинт для формы стажировки/практики
app.post('/send-email', async (req, res) => {
  const { lastName, firstName, phone, email, direction } = req.body;
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
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
            <td style="border: 1px solid #ddd; padding: 8px;">${direction}</td>
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
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
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

// Проверка работоспособности сервера
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
