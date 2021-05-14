var aws = require("aws-sdk");
var nodemailer = require("nodemailer");
var ses = new aws.SES();



exports.handler = (event, contxe, callback) => {

  const mailOptions = {
    from: "js.levelt@gmail.com",
    subject: `This is an order sent by ${event.name}`,
    html: 'Hello from cenc',
    to: "js.levelt@yahoo.com",
    // to: "jackoschoonderwoerd@yahoo.nl",
    bcc: ["jackoboes@gmail.com"]
    // bcc: Any BCC address you want here in an array,
  };

  var transporter = nodemailer.createTransport({
    SES: ses
  });

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Error sending email", err);
    } else {
      // console.log("Email sent successfully");
      console.log('event: ', event);
    }
  });
}
