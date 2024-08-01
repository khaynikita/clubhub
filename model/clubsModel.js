const mongoose = require('mongoose')
// const Coordinator = require('./coordinatormodel')
const Schema = mongoose.Schema

// mongoose.connect('mongodb://localhost:27017/clubhub').then(()=>{
//   console.log("connection!!")
// }).catch((err)=>{
//   console.log(err)
// })

const clubSchema = Schema({
    name: String,
    clubCoordinator:{
        type: Schema.Types.ObjectId,
        ref: 'Coordinator'
    }

})

// const Club = mongoose.model('Club', clubSchema)

// const fill = [
//     {
//         name:'eco',
//     },
//     {
//         name:'technical',
//     },
//     {
//         name:'sports',
//     },
//     {
//         name:'cultural',
//     },
// ]
// const filldata = async()=>{
//     const c = {
//         'c1' : await Coordinator.findOne({name:'Mansi Vats'}),
//         'c2' : await Coordinator.findOne({name:'Sonia Batra'}),
//         'c3' : await Coordinator.findOne({name:'Meetender Adhana'}),
//         'c4' : await Coordinator.findOne({name:'Smriti Sharma'}),
//     }
    
//     for(let x=0 ; x<4;x++){
//         let data = await new Club(fill[x])
//         data.clubCoordinator = c[`c${x+1}`]
//         console.log(Club.clubCoordinator)
//         // await c[`c${x+1}`].save()
//         await data.save()
//         // await Club.save()
//     }

//     // console.log(Club)
//     // let data = new Club(x)
//     // await data.save()
// }
// filldata()

module.exports = mongoose.model('Club', clubSchema)


