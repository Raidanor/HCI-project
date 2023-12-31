const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


// How is how the data structure that is heading to the db will look
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique: true,
    },
    password:{
        type: String,
        required:[true, "Password is Required!"]
    },
    
});

// This is allowing our password to get salt and then be hashed using bcrypt
// The pre is a hook from mongooes that allows us to interupt the default saving and change
// how things look before we get to the db
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect Email")
};



module.exports = mongoose.model("Users", userSchema)