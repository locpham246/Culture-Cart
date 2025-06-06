import jwt from "jsonwebtoken";


const user = async(req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.json({success: false, message: 'Not Correct. Please Login Again'})
    }
    try{
        const token_decode= jwt.verify(token, process.env.JWT_KEY)
        if(token_decode.id){
            req.body.userId= token_decode.id
        }else{
            return res.json({success:false, message:'Not Correct. Please Login Again'})}
            next();
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}

export default user;