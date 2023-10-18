const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken")
const maxAgeInDays = 365;
const maxAgeInMilliseconds = maxAgeInDays * 24 * 60 * 60 * 1000;


const createToken = (id) => {
    return jwt.sign({id},"HCI-Project!", {
        expiresIn: '2h'
    })
}

const handleError = (err) => {
    const errors = {};

    if (err.message === "Incorrect Email"){
        errors.email = "That email is not registered"
    };
    if(err.message === "Incorrect password"){
        errors.password = "That password is not correct"
    };

    if (err.code === 11000) {
        errors.email = "Email is already in use";
    };

    if (err.name === "ValidationError") {
        Object.keys(err.errors).forEach((field) => {
            errors[field] = err.errors[field].message;
        });
    }
    return errors;
};


module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.create({email, password});
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAgeInMilliseconds
        });
        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleError(err);
        res.status(400).json({ errors, created: false });
    }
};
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login( email, password );
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAgeInMilliseconds
        });
        res.status(200).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleError(err);
        res.status(400).json({ errors, created: false });
    }
};