const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({id},"HCI-Project!", {
        expiresIn: '2h'
    })
}

module.exports.register = async (req, res, next) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.create({email, password});
        const token = createToken(user._id)// takes the ID assigned from Mongodb!

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: '365d'
        })
    } catch(err){

    }
};

module.exports.login = async (req, res, next) => {
    
};