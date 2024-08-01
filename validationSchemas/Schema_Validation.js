const Joi = require('joi')

module.exports={
        EventSchema : Joi.object({
            event_name:Joi.string().required(),
            event_date:Joi.date().greater('now').required(),
            event_club:Joi.string(),
            // image:Joi.string().required(),
            event_details:Joi.object({
                // event_Poster:Joi.string().required(),
                event_coordinator_1:Joi.string().required(),
                event_coordinator_2:Joi.string().required(),
                event_description:Joi.string().required(),
                club_coordinator:Joi.string(),
                min_member_range:Joi.number().required().min(0).max(60),
                max_member_range:Joi.number().required().min(0).max(60)
            }).required(),

        }),

        MembersSchema : Joi.object({
            first_name:Joi.string().required(),
            last_name:Joi.string().required(),
            class:Joi.string().required(),
            semester:Joi.number().required().min(0).max(6),
            roll_no:Joi.string().pattern(/^[0-9]+$/, { name: 'numbers'}).required(),
            email:Joi.string().email({ minDomainSegments: 2}).required(),
            phone:Joi.string().length(10,'utf8').pattern(/^[0-9]+$/, { name: 'numbers'}).required(),
            exp:Joi.string().required(),
        }),

        ParticipateSchema : Joi.object({
            name :Joi.string().required(),
            class : Joi.string().required(),
            semester: Joi.number().required().min(0).max(6),
            roll_no:Joi.string().pattern(/^[0-9]+$/, { name: 'numbers'}).required(),
            email:Joi.string().email({ minDomainSegments: 2}).required(),
            phone:Joi.string().length(10,'utf8').pattern(/^[0-9]+$/, { name: 'numbers'}).required(),
            event_id:Joi.string().alphanum().required(),
            event:Joi.object({
                event_name:Joi.string().required(),
                event_club:Joi.string().required(),
                event_date:Joi.date().greater('now').required()
            }).required(),
            numberofteammembers: Joi.number().integer().required(),
            participation_members : Joi.array().items(Joi.string().required()).min(Joi.ref('numberofteammembers')).required(),
            
        })


}





