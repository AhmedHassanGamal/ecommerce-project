const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'wiley.weimann62@ethereal.email',
        pass: 'nWybbvJAHnama7USje'
    }
});

const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from:"smtp.ethereal.email",
      to, 
      subject, 
      text, 
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
