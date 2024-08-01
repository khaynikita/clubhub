const express = require('express')
const passport = require('passport')
const asyncHandler = require('express-async-handler')
const Club = require("../model/clubsModel")
const User = require("../model/users")
const {storeReturnTo} = require('../middleware')


const router = express.Router()

router.get('/register',(req,res)=>{
res.render('auth/register')
})

router.post('/register',asyncHandler(async(req,res, next)=>{
    try{
        const {username, email, club, password} = req.body;
        // console.log(club)
        const get_club = await Club.findOne({name: club})
        const user = new User({
            username:username,
            email:email,
            club:get_club
        })
        const registedUser = await User.register(user, password)
        req.login(registedUser, (err)=>{
            if(err) return next(err)
            res.redirect('/user')
        })
        
    }catch(err){
        req.flash('error', err.message)
        res.redirect('/register')
    }
}))

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    const redirectUrl = res.locals.returnTo || '/user'
    res.redirect(redirectUrl)
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
})

module.exports = router