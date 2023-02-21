var nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
  try {
    //creating SMTP server for connection
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port 465 and 587 are both valid ports for a mail submission agent (MSA)
      port: 587,
      secure: true,

      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
        // user: "gshivangi106@gmail.com",
        // pass: 'qzuwhqsfswgowvda',
      },
    });

    // fixed for mailoption which is always there
    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: subject,
      text: text,
    };
    //send mail through sendMail method
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully " + info.response);
      }
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
