
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = Schema({
    title:{
        type:String,
        required:true
    },
    date :{
        type:Date,
        required:true
    },
    data:{ 
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    club:{
        type:Schema.Types.ObjectId,
        ref:'Club'
    }
})

module.exports = mongoose.model('Message', messageSchema)