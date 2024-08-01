const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facultycoordinatorSchema = Schema({
    name: {
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Coordinator', facultycoordinatorSchema)
// const fill = [
//     {
//         name:'Sonia Batra',
//     },
//     {
//         name:'Mansi Vats',
//     },
//     {
//         name:'Meetender Adhana',
//     },
//     {
//         name:'Smriti Sharma',
//     },
// ]
// const filldata = async()=>{
//     for (let x of fill){
//         let data = new Coordinator(x)
//         await data.save()
//     }
// }
// filldata()