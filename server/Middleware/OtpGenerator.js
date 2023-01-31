import nodeMailer from "nodemailer"


const randomOtp = () => {
    const Otpforsignup = Math.floor(1000 + Math.random() * 9000);
    console.log(Otpforsignup,7632222);
    return Otpforsignup;
}
export const otpMailGenerator= async (email)=>{

        const newOtp = randomOtp();
        const mailTransporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EmailId,
                pass: process.env.SMTPpassword
            },
        })
        const Otpdetails = {
            from: "frombookmymenu@gmail.com",
            to: email,
            subject: "Vendor Account OTP Verification",
            text: `Thank you for registering with BOOK MY MENU, Please verify your email with this OTP ${newOtp}`
        }
       const newotp =  mailTransporter.sendMail(Otpdetails, (error) => {
            if (error) {
                console.log(error,1234567);
            } else {
                console.log("mail send succesfully");
                
            }
        })
       
        return newOtp;
    
}