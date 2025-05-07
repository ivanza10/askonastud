const nodemailer = require('nodemailer');

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

exports.handler = async (event, context) => {
  // Разрешаем CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Обработка preflight запросов
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { name, phone, selectedArea, isInternationalPhone } = JSON.parse(event.body);
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

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email отправлен успешно' })
    };
  } catch (error) {
    console.error('Ошибка отправки почты:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Ошибка отправки почты' })
    };
  }
}; 