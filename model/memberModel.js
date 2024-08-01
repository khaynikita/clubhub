const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const memberModel = new Schema({
    first_name : {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    class: {
        type:String,
        required:true
    },
    semester: {
        type:Number,
        required:true,
        min:0,
        max:6
    },
    roll_no: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true,
        length:10
    },
    club: {
        type:Schema.Types.ObjectId,
        ref:'Club'
    },
    exp:{
        type:String,
        required:true
    },
    memberApproved:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model('memberModel', memberModel)