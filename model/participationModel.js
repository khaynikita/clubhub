const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const participationModel = new Schema({
    name : {
        type: String,
        required:true
    },
    class : {
        type: String,
        required:true
    },
    semester: {
        type:Number,
        required:true,
        min:0,
        max:6
    },
    roll_no: {
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true,
        length:10
    },
    event_id:{
        type:String,
        required:true
    },
    event:{
        event_name:{
            type: String,
            required:true
        },
        event_club:{
            type: String,
            required:true,
        },
        event_date:{
            type: Date,
            required: true
        }
    },
    numberofteammembers: {
        type: Number,
        required: true
    },
    participation_members : [{
        type: String,
        required: true
    }]
    
    
})


module.exports = mongoose.model('participationModel', participationModel)