var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dudvil1@gmail.com",
    pass: "hfvndvoetwhkwwgw"
  }
});

function sendingMail(mailOptions){
    console.log(mailOptions);
    transporter.sendMail({
        to: mailOptions.mailTo, 
        subject: mailOptions.subject,
        html: mailOptions.html
    });
}
module.exports = sendingMail;
