const express = require('express')
const router = express.Router()
const Member = require('../model/memberModel')
const {isLoggedIn} = require('../middleware')
const Club = require("../model/clubsModel")
const User = require("../model/users")
const Message = require("../model/message")
const Event = require("../model/eventModel")
const Participant = require("../model/participationModel")


router.get('/',isLoggedIn,async(req,res)=>{
    const user = await User.findById(req.user._id).populate('club')
    const date = new Date()
    console.log(user.club.name)
    const event = await Event.find({event_club:user.club, event_date:{$gt:date}})
// console.log(event)
    res.render('userProfile/index',{user, event})
})

router.get('/event/:id/participant',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(req.user._id).populate('club')
    const participants = await Participant.find({event_id:id})
    // console.log(participatants)
    res.render('userProfile/allparticipants', {participants, Clubname:user.club.name})
})

router.get('/memberrequest',isLoggedIn,async(req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    const user = await User.findById(req.user._id).populate('club')
    const ClubMember = await Member.find({club:user.club, memberApproved:false})
    // console.log(Club)
    res.render('userProfile/memberrequest', {ClubMember, Clubname:user.club.name})
})

router.patch('/member/:id/approve',async(req,res)=>{
    const {id} = req.params;
    const event = await Member.findByIdAndUpdate(id, {memberApproved:true} , {runValidation:true, new:true})
    res.redirect('/user/memberrequest')
})
router.delete('/member/:id/decline',async(req,res)=>{
    const {id} = req.params;
    await Member.findByIdAndDelete(id)
    res.redirect('/user/memberrequest')
})

router.get('/members',isLoggedIn,async(req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    const user =await User.findById(req.user._id).populate('club')
    const ApprovedMember = await Member.find({club:user.club,memberApproved:true})
    // const Clubname = await Club.findById(user.club)
    res.render('userProfile/members', {ApprovedMember, Clubname:user.club.name})
})

router.get('/message/new',isLoggedIn,(req,res)=>{
res.render('userProfile/addMessage.ejs')
})

router.post('/message',isLoggedIn,async(req,res)=>{
    const {title, data} = req.body;
    const msg = new Message({
        title : title,
        date: Date.now(),
        data:data,
        author: req.user,
        club: req.user.club
    })
    await msg.save()
    res.redirect('/user/showmessage')
})

router.get('/showmessage',isLoggedIn,async(req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    const user =await User.findById(req.user._id).populate('club')
    const msg = await Message.find({author:user._id}).populate('author').populate('club')
    console.log(msg)
    res.render('userProfile/showmessage',{msg})
})

router.get('/message/:id/edit',isLoggedIn,async(req,res)=>{
    const msg = await Message.findById(req.params.id)
    res.render('userProfile/editmessage',{msg})
 })
router.put('/message/:id',isLoggedIn,async(req,res)=>{
    const msg = await Message.findByIdAndUpdate(req.params.id, req.body,{runValidation:true,new:true})
    res.redirect('/user/showmessage')
 })
router.delete('/message/:id',isLoggedIn,async(req,res)=>{
    const id = req.user.club
    await Message.findByIdAndDelete(req.params.id)
    res.redirect('/user/showmessage')
 })




module.exports = router