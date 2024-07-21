const { nodemailer, Transporter } = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

function sendMail(options) {
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

    const html = ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: html
    };


}

module.exports = sendMail;