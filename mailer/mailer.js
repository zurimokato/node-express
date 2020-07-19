const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'maureen73@ethereal.email',
      pass: 'B3qZcfB53jdvZS6TeP'
    },
  });


  module.exports= transporter;