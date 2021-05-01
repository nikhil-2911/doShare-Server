const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }){
    
    // console.log("entering");
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : true,
        auth : { 
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
    });
    // console.log("exit");
    let info = await transporter.sendMail({ 
        from : `doShare <${from}>`,
        to,
        subject,
        text,
        html
    });

    console.log(info);
};  

module.exports = sendMail;
