const nodemailer = require('nodemailer');

// Step 1: Generate an App Password from Gmail
// Visit: https://myaccount.google.com/security
// In the "Signing in to Google" section, enable "2-Step Verification" if not already enabled.
// Then, go to "App passwords", select "Mail" and your "Device", and generate an app password.
// Use this generated app password in the 'pass' field below.

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-generated-app-password', // Use the app password you generated
  },
});

const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Testing Nodemailer',
  text: 'This is a test email sent using Nodemailer.', // You can replace the text with email content
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
