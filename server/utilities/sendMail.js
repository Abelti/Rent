const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

async function sendMail(options) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const { email, subject, template, data } = options;

    const templatePath = path.join(__dirname, '../mails', template);
    try {
        const html = await ejs.renderFile(templatePath, data);

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.info(`Email sent successfully`);
    }
    catch (err) {
        console.error(`Error sending email: ${err}`);
        throw err;  // rethrow error for the caller to handle appropriately. For example, you might want to log it to a file or a monitoring system.  // You could also choose to retry sending the email in case of failures.  // In a production-grade application, you might want to implement a retry mechanism with exponential backoff.  // For simplicity, this example doesn't include these features.  // For production-grade applications, you should consider using a reliable and scalable email service like Mailgun, SendGrid, or AWS SES.  // Also, remember to secure your SMTP credentials and store them securely in environment variables or a secure configuration file.  // For example, you might want to use a library like dotenv to load your environment variables.  // Finally, be aware that sending emails from a free or low-cost email service can lead to your account being temporarily suspended or your emails
    }

}

module.exports = sendMail;