const nodeMailer = require('nodemailer');

const sendEmail = async (email,subject,html) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'el7a2nii@gmail.com',
              pass: 'paun nhxi kkqw qvjv',
            },
        });
          const mailOptions = {
            from: 'el7a2nii@gmail.com',
            to: email,
            subject: subject,
            html: html,
          };
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);  
    } catch (err) {
        console.log(err);
    }
}

exports.sendEmail = sendEmail;