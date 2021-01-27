const express=require('express')

const router=new express.Router()

const auth=require('../middleware/auth')
const Reporters = require('../models/reporters2')


//////get reporters

router.get('/reporters',auth,(req,res)=>{
    Reporters.find({}).then((reporters)=>{
        res.status(200).send(reporters)
    }).catch((e)=>{
        res.status(500).send('internal server error')
    })
})

////post reporters
router.post('/reporters',async(req,res)=>{
    const reporters=new Reporters(req.body)
    try{
        await reporters.save()
        const token=await reporters.generateToken()
        res.status(200).send({reporters,token})

    }
    catch(e){
         res.status(400).send('unable')
           }
})


/////reporters login
router.post('/reporters/login',async(req,res)=>{
    try{
        const reporters=await Reporters.findByCredentials(req.body.email,req.body.password)
        await reporters.save()
        const token=await reporters.generateToken()
        res.status(200).send({reporters,token})
        
    }catch(e){
        res.status(400).send('unable to login check your info')
    }
})
/////// reporter profile
router.get('/profile',auth,async(req,res)=>{
    res.send(req.reporters)
})
/////delete reporter profile
router.delete('/profile',auth,async(req,res)=>{
    try{
        await req.reporters.remove()
        res.send('profile was deleted')
    }catch(e){
        res.send(e)
    }
})

///////logout 
router.post('/logout',auth,async(req,res)=>{
    try{req.reporters.tokens=req.reporters.tokens.filter((el)=>{
        return el.token!==req.token
    })
    await req.reporters.save()
    res.send('logout successfully')}
    catch(e){ 
        res.status(500).send('please login')

    }
}) 
//////edit info of the reporters
router.patch('/profile',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates)
    
    try{
      
        updates.forEach((update)=>req.reporters[update]=req.body[update])
        await req.reporters.save()
        
        res.status(200).send(req.reporters)
    }catch(e){
        res.status(400).send('error has occurd')
    }
})





module.exports=router
