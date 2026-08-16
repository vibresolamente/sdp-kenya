import nodemailer from 'nodemailer';

// Load environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 587;

if (!EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_HOST) {
  console.warn('Email configuration is incomplete. Email sending will be disabled.');
}

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  if (!EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_HOST) {
    console.error('Missing email configuration.');
    return;
  }
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: EMAIL_USER,
    subject: `[SDP Contact] ${subject}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (err) {
    console.error('Error sending contact email:', err);
  }
}
