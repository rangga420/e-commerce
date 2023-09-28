console.log(Date.now())

// const nodemailer = require("nodemailer");

// nodemailer.createTestAccount((err, account) => {
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "esther.rath25@ethereal.email", // generated ethereal user
//       pass: "Xva2nQ9yjT3DvUbKVf"  // generated ethereal password
//     }
//   });
//   const info = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "elda.terry53@ethereal.email", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   };
//   transporter.sendMail(info)
//     .then(info => {
//       console.log(info)
//       console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
//     })
//     .catch(err => {
//       console.log(err)
//     })
// });