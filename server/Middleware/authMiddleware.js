
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const {JWT_SECRET_KEY} = process.env;

const auth = (req,res,next)=>{
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token){
            decodedData = jwt.verify(token,JWT_SECRET_KEY);
            req.authId = decodedData?.id;
           
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;