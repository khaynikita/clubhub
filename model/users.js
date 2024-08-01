const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    club:{
        type : Schema.Types.ObjectId,
        ref:'Club'
    }
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
