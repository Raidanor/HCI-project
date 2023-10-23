const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")


// How we are going to verify that users are correctly logged in using the cookie deployed once they sign in or register 
// Their account
module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    
    // If user token exists this happens
    if(token) {
        jwt.verify(token,"HCI-Project!", async (err, decodedToken) => { 
            if(err ){
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                if(user){
                    res.json({ status: true, user: user.email});
                } else {
                    res.json({status: false});
                }
                next();
            };
        });
    } else {
        res.json({status:false});
        next();
    };
}