const express=require('express')
const News=require("../models/news2")
const router=new express.Router()
const auth=require('../middleware/auth')
const Reporters = require('../models/reporters2')

///////// add new news 

router.post('/news',auth,async(req,res)=>{
    const news=new News({
    ...req.body,
    owner:req.reporters._id})

    try{
    await news.save()
        res.status(200).send(news)
    }
catch(e){
    
    res.status(400).send(e)}

})

//////get all the news of each reporter
router.get('/news',auth,async(req,res)=>{
    try{
        const match={}
        if(req.query.completed){
            match.completed=req.query.completed==='true'
        }

        const sort={}
        if (req.query.sortBy){
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1]==='desc'?-1:1
        }
   
    await req.reporters.populate({
        path:'news',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
           sort
        },
    
    }).execPopulate()
    res.send(req.reporters.news)
    }catch(e){
        res.status(500).send('internal server error')
    }
})

//////////////get news by id

router.get('/news/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
    const news= await News.findOne({_id,owner:req.reporters._id})
        if(!news){
            return res.status(400).send("unable to find news")
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send('internal server error')
    }
})






//////update news by id
router.patch('/news/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const updates = Object.keys(req.body)
    try{
        const news = await News.findOne({_id,owner:req.reporters._id})
        if(!news){
            return res.status(404).send()
        }
        updates.forEach((update)=>news[update]=req.body[update])
        await news.save()
        res.status(200).send(news)
    }
    catch(e){
        res.status(400).send()
    }
})

///////////////delete news by id
router.delete('/news/:id',auth, async(req,res)=>{
    const _id=req.params.id
    try{

        const reporters=await Task .findOneAndDelete({_id,owner:req.reporters._id})
        if(!reporters){
            return res.status(400).send()
        } return res.send(reporters)
    }catch(e){
return res.status(500).send()
    }
})

////////////////////////add photo to news

const multer=require('multer')
const uploads=multer({
    
limits:{
    fileSize:1000000
},
fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
        return cb (new Error('please upload an image'))
    }
    cb(undefined,true)
}

})
router.post('/news/avatar/:id',auth,uploads.single('avatar'),async(req,res)=>{
    const _id=req.params.id
    try{
        const news=await News.findOne({_id,owner:req.reporters._id})
        if(!news){
            return res.status(400).send('Unable to upload')
        }
        news.avatar=req.file.buffer
        await news.save()

        res.status(200).send(news)
    }
    catch(e)
{
    res.send(e)
}})



module.exports= router