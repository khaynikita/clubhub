const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    filename: String,
    path:String
})
const eventModel = new Schema({
    image : ImageSchema,
    event_name : {
        type: String,
        required:true
    },
    event_club:{
        type : Schema.Types.ObjectId,
        ref:'Club'
    },
    event_date:{
        type: Date,
        required: true
    },
    event_details:{
        event_Poster:ImageSchema,
        event_coordinator_1:{
            type: String,
            required:true
        },
        event_coordinator_2:{
            type: String,
            required:true
        },
        event_description: {
            type: String,
            required:true
        },
        club_coordinator: {
            type : Schema.Types.ObjectId,
            ref:'Coordinator'
        },
        min_member_range:{
            type: Number,
            required:true,
            min: 0 
        },
        max_member_range: {
            type: Number,
            required:true,
            min:0
        }
    },
    participant :[
        {
            type:Schema.Types.ObjectId,
            ref:'participationModel'
        }  
    ]
    
})


module.exports = mongoose.model('eventModel', eventModel)