const {EventSchema, MembersSchema,ParticipateSchema} = require("./validationSchemas/Schema_Validation")

module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You need to be Logged In')
        // console.log(req.flash())
        return res.redirect('/login')
    }
    next()
} 

module.exports.storeReturnTo=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo
    }
    next()
}

module.exports.MemberValidateSchema = (req,res,next)=>{
    const {error} = MembersSchema.validate(req.body);
    if(error){
      const msg = error.details.map(el=>el.message).join(',')
      req.flash('validationError', msg)
      const redirecturl = '/join/'+req.originalUrl.split('/')[3]+'/add'
      res.redirect(redirecturl)
  }else{
      next()
  }
}

module.exports.EventValidateSchema = (req,res,next)=>{
    const {error} = EventSchema.validate(req.body);
    if(error){
      const msg = error.details.map(el=>el.message).join(',')
      req.flash('validationError', msg)
      let redirecturl = ''
      if(req.originalUrl==='/event'){
        redirecturl = '/event/new'
      }else{
        redirecturl = req.originalUrl.split('?')[0]+'/edit'
      }
      res.redirect(redirecturl)
  }else{
      next()
  }
}

module.exports.ParticipateValidateSchema = (req,res,next)=>{
    const {error} = ParticipateSchema.validate(req.body);

    if(error){
      const msg = error.details.map(el=>el.message).join(',')
      req.flash('validationError', msg)
      console.log(req.originalUrl)
      const redirecturl = `/event/${req.originalUrl.split('/')[2]}/participate`
      res.redirect(redirecturl)
  }else{
      next()
  }
}