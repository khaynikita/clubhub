const express = require('express');
const mongoose = require('mongoose')
const eventModel = require("../model/eventModel")
const memberModel = require("../model/memberModel")
const User = require("../model/users")
const participationModel = require("../model/participationModel")
const Club = require("../model/clubsModel")
const Message = require("../model/message")
const {isLoggedIn, MemberValidateSchema, ParticipateValidateSchema, EventValidateSchema } = require('../middleware')
const Coordinator = require("../model/coordinatormodel")
const ExpressError = require('../utils/ExpressError')
const asyncHandler = require('express-async-handler')

const {storage, cloudinary} = require('../cloudinary/index')
const Multer = require('multer')
const upload = Multer({storage:storage})

const Joi = require('joi')

var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/eco', asyncHandler(async function(req, res) {
  const data = await Club.findOne({name:'eco'}).populate('clubCoordinator')
  console.log(data)
  res.render('eco',{data});
}));
router.get('/technical', asyncHandler(async function(req, res) {
  const data = await Club.findOne({name:'technical'}).populate('clubCoordinator')
  console.log(data)
  res.render('technical',{data});
}))
router.get('/cultural',asyncHandler(async  function(req, res) {
  const data = await Club.findOne({name:'cultural'}).populate('clubCoordinator')
  console.log(data)
  res.render('cultural',{data});
}))
router.get('/sports', asyncHandler(async function(req, res) {
  const data = await Club.findOne({name:'sports'}).populate('clubCoordinator')
  console.log(data)
  res.render('sports',{data});
}))


//join club part
router.get('/join/:id/add', function(req, res) {
  const {id} = req.params
  res.render('form',{id});
});

router.post('/join/request/:id',MemberValidateSchema,asyncHandler(async function(req,res,next) {
  const club = await Club.findOne({_id: req.params.id})
  console.log(club)
  const body = req.body
  const data = new memberModel(body);
  data.club = club
  console.log(club)
  await data.save()
  res.render('join');
}))


//event CRUD operations
router.get('/event',asyncHandler(async(req,res,next)=>{
  const param = req.query;
  const date = new Date();
  const selectedClub = param.event_club
  const club = await Club.findOne({name:param.event_club})
  let future ={}
  let past = {}
  if(club===null){
    future =  await eventModel.find({event_date:{$gt:date}}).populate('event_club')
    past = await eventModel.find({event_date:{$lte:date} }).populate('event_club')
  }else{
    future =  await eventModel.find({event_club:club._id,event_date:{$gt:date} }).populate('event_club')
    past = await eventModel.find({event_club:club._id, event_date:{$lte:date} }).populate('event_club')
    
  }
  res.render('event',{past, future,selectedClub})
}))

router.get('/event/new',isLoggedIn,(req,res)=>{
  res.render('addEvent')
})

router.post('/event',isLoggedIn,upload.fields([{name:'logo'},{name:'poster'}]),EventValidateSchema,asyncHandler(async(req,res,next)=>{
  const data = new eventModel(req.body);
  const user = await User.findById(req.user).populate({path:'club',populate:{path:'clubCoordinator'}})
  if(req.files){
    data.image = req.files['logo'].map(ele=>({filename:ele.filename, path:ele.path}))[0]
    data.event_details.event_Poster = req.files['poster'].map(ele=>({filename:ele.filename, path:ele.path}))[0]
  }
  data.event_club = user.club;
  data.event_details.club_coordinator = user.club.clubCoordinator
  await data.save();
  res.redirect(`/event/${data.id}`)
}))

router.delete('/event/:id',isLoggedIn,asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const event = await eventModel.findById(id)
  if(event.image){
    await cloudinary.uploader.destroy(event.image.filename)
  }
  if(event.event_details.event_Poster){
    await cloudinary.uploader.destroy(event.event_details.event_Poster.filename)
  }
  await event.deleteOne()
  // // await eventModel.findByIdAndDelete(id)
  
  res.redirect('/event')
}))

router.get('/event/:id',asyncHandler(async(req,res,next)=>{
  try{
    const {id} = req.params;
    const event = await eventModel.findById(id).populate('event_club').populate('event_details.club_coordinator')
    const date= new Date()
    res.render('eventDetail',{event, date})
  }catch(err){
    return next( new ExpressError('Event Not found By Id Given',404) )
  }
  
}))

router.get('/event/:id/edit',isLoggedIn,asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const event = await eventModel.findById(id).populate('event_club').populate('event_details.club_coordinator')
  let date = ""
  if(event.event_date.getMonth()+1<10){
    if(event.event_date.getDate()<10){
      date =`${event.event_date.getFullYear()}-0${event.event_date.getMonth()+1}-0${event.event_date.getDate()}`
    }else{
      date =`${event.event_date.getFullYear()}-0${event.event_date.getMonth()+1}-${event.event_date.getDate()}`
    }
  }else{
    date =`${event.event_date.getFullYear()}-${event.event_date.getMonth()+1}-${event.event_date.getDate()}`
  }
   
  console.log(date)
  console.log(event)
  res.render('edit',{event , date})

}))

router.put('/event/:id',isLoggedIn,upload.fields([{name:'logo'},{name:'poster'}]),EventValidateSchema,asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const eventDetail = await eventModel.findById(id)
  currenteventlogo = eventDetail.image
  currenteventposter = eventDetail.event_details.event_Poster
  const event = await eventModel.findByIdAndUpdate(id, req.body , {runValidation:true})
  if(req.files){
    if(req.files['logo']){
      await cloudinary.uploader.destroy(eventDetail.image.filename)
      event.image = req.files['logo'].map(ele=>({filename:ele.filename, path:ele.path}))[0]
    }else{
      event.image = currenteventlogo
    }
    if(req.files['poster']){
      await cloudinary.uploader.destroy(eventDetail.image.filename)
      event.event_details.event_Poster = req.files['poster'].map(ele=>({filename:ele.filename, path:ele.path}))[0]
    }else{
      event.event_details.event_Poster=currenteventposter
    }
  }
  await event.save()
  res.redirect(`/event/${event.id}`)
}))

// Event participation 
router.get('/event/:id/participate',asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const event = await eventModel.findById(id).populate('event_club')
  let date = ""
  if(event.event_date.getMonth()+1<10){
    if(event.event_date.getDate()<10){
      date =`${event.event_date.getFullYear()}-0${event.event_date.getMonth()+1}-0${event.event_date.getDate()}`
    }else{
      date =`${event.event_date.getFullYear()}-0${event.event_date.getMonth()+1}-${event.event_date.getDate()}`
    }
  }else{
    date =`${event.event_date.getFullYear()}-${event.event_date.getMonth()+1}-${event.event_date.getDate()}`
  }
  let member=0;
  res.render("participation", {event,date, member})
}))

router.get('/participate/new/:id',asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  const data = await participationModel.findById(id)
  const clubParticipate = await Club.findById(data.event.event_club)
  const club = clubParticipate.name
  console.log(data)
  res.render('participateSuccess',{data, club})
}))

router.post('/participate/:id/new',ParticipateValidateSchema,asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  const event = await eventModel.findById(id)
  const data = new participationModel(req.body)
  event.participant.push(data)
  await event.save()
  await data.save()
  res.redirect(`/participate/new/${data.id}`)
}))

router.get('/join',asyncHandler(async(req,res)=>{
  const data = await Club.find({}).populate('clubCoordinator')
  res.render('joinclub',{data})
}))
router.get('/notifications',asyncHandler(async(req,res)=>{
  const data = await Message.find({}).populate('author').populate('club')

  res.render('notification',{data: data.reverse()})
}))

router.get('/allmembers',asyncHandler(async(req,res)=>{
  const clubinfo = await Club.find({}).populate('clubCoordinator')
  const data = await memberModel.find({memberApproved:true}).populate('club')
  console.log(data)

  res.render('allmembers',{data, clubinfo})
}))

// router.all('*',(req,res,next)=>{
//   next(new ExpressError('Page Not Found!', 404))
// })

// function handleValidation(err){
//   return new ExpressError(`Validation Error!!${err.message}`, 403) 
// }

// router.use((err,req,res,next)=>{
//   const {status=400} = err;
//   // if(!err.message)err.message = "Error!"
//   // if(error.name=='ValidationError'){
//   //   err = handleValidation(err)
//   // } 
//   // console.log(err.name)
//   // console.log(err.stack)
//   res.status(status).render("error",{err})
// })

module.exports = router;
