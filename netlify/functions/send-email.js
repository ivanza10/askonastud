const nodemailer = require('nodemailer');

// Функция для создания транспорта почты
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
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
    console.log('Received request body:', event.body);
    const { lastName, firstName, phone, email, direction } = JSON.parse(event.body);
    
    // Проверяем наличие всех необходимых данных
    if (!lastName || !firstName || !phone || !email || !direction) {
      throw new Error('Missing required fields');
    }

    console.log('Creating transporter...');
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

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email отправлен успешно', info })
    };
  } catch (error) {
    console.error('Detailed error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Ошибка отправки почты',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 