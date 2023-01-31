import nodeMailer from "nodemailer"

export const MailSender = (email)=>{

    const mailTransporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EmailId,
            pass: process.env.SMTPpassword
        },
    })
    
    const details = {
        from: "frombookmymenu@gmail.com",
        to: email,
        subject: "Vendor Account Registration",
        text: " Thank you for registering with BOOK MY MENU, we will verify your account and send you a email notification once approved."
    }
    
    mailTransporter.sendMail(details, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("mail send succesfully");
        }
    })
}