const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { text } = require("express");

const UserSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true
    // },
    fullName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true 
    },
    password:{
        type:String,
        require: true,
    },
    profileImageUrl:{
        type:String,
        default:null
    }
},{timestamps:true}
);

//hashing password before saving it 

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//compare password 
UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);