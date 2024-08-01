const mongoose = require("mongoose")
require('dotenv').config()
// const eventModel = require("../model/eventModel")
const Club = require("../model/clubsModel")
const Coordinator = require("../model/coordinatormodel")
const mongoUrl = process.env.MONGODB_URL
console.log(mongoUrl)
 mongoose.connect(mongoUrl).then(()=>{
  console.log("connection!!")
}).catch((err)=>{
  console.log(err)
})

// const fill1 = [
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
// const filldata1 = async()=>{
//     for (let x of fill1){
//         let data = new Coordinator(x)
//         await data.save()
//     }
// }
// filldata1().then(()=>{
//       mongoose.connection.close()
//   })
// seedData()

// const Club = mongoose.model('Club', clubSchema)

const fill = [
    {
        name:'eco',
    },
    {
        name:'technical',
    },
    {
        name:'sports',
    },
    {
        name:'cultural',
    },
]
const filldata = async()=>{
    const c = {
        'c1' : await Coordinator.findOne({name:'Mansi Vats'}),
        'c2' : await Coordinator.findOne({name:'Sonia Batra'}),
        'c3' : await Coordinator.findOne({name:'Meetender Adhana'}),
        'c4' : await Coordinator.findOne({name:'Smriti Sharma'}),
    }
    
    for(let x=0 ; x<4;x++){
        let data = await new Club(fill[x])
        data.clubCoordinator = c[`c${x+1}`]
        // await c[`c${x+1}`].save()
        await data.save()
        console.log(Club.clubCoordinator)
        // await Club.save()
    }

    // console.log(Club)
    // let data = new Club(x)
    // await data.save()
}
filldata().then(()=>{
        mongoose.connection.close()
    })
// // const bg = {
// //     1:"/images/event1.png",
// //     2:"/images/event2.png",
// //     3:"/images/event3.png",
// //     4:"/images/event4.png",
// // }
// // const dates = {
// //     1:"2024-04-04",
// //     2:"2024-04-10",
// // }
// // const seedData = async()=>{
// //     await eventModel.deleteMany({})
// //     for(let i=0;i<10;i++){
// //         const data = new eventModel({
// //             image:{
// //                 "filename": "clubhub/logo/ebmji2jbxl3unz3qma9h",
// //                 "path": "https://res.cloudinary.com/dpuwqc6vr/image/upload/v1719566267/clubhub/logo/ebmji2jbxl3unz3qma9h.jpg",
// //               },
// //             event_name : "cricket",
// //             event_club: '663a8bd242ef3c24884e83e2',
// //             event_date:dates[Math.floor(Math.random()*2)+1],
// //             event_details:{
// //                 event_Poster: {
// //                     "filename": "clubhub/poster/gobhcxgkupmojjvuah7a",
// //                     "path": "https://res.cloudinary.com/dpuwqc6vr/image/upload/v1719566265/clubhub/poster/gobhcxgkupmojjvuah7a.jpg",
// //                   },
// //                 event_coordinator_1:"Ankit Kumar",
// //                 event_coordinator_2:"Mayank Parasher",
// //                 event_description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores placeat nobis pariatur quidem laudantium alias tempore dicta, illum aliquid totam vitae cumque delectus distinctio dolore deserunt blanditiis nulla veniam repellat facilis tenetur ex repellendus tempora. Modi dolore possimus accusantium aperiam repellat. Dolore cum ipsa odio cupiditate excepturi, pariatur doloribus saepe tempore veritatis iusto repudiandae, architecto tempora minus ex! Ab neque, assumenda, id exercitationem hic quasi numquam aspernatur eligendi mollitia doloremque, corrupti dolorum! Culpa praesentium officiis, fugit dignissimos eaque odio quidem placeat aspernatur assumenda voluptates dolore in. Laborum aliquam adipisci pariatur, tempore aut libero ex laudantium voluptas! Esse facere provident eaque?",
// //                 club_coordinator: "663a84c3d07388718419cae9",
// //                 min_member_range:3,
// //                 max_member_range:5
// //             }
// //         })
// //         await data.save()
// //     }
// // }

// // seedData().then(()=>{
// //     mongoose.connection.close()
// // })