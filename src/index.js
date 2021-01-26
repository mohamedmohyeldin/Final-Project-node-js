const express=require('express')
const News=require('./models/news2')
const newsRouter=require('./routers/news')
const reportsRouter=require('./routers/reporters')

const jwt=require('jsonwebtoken')
require('./db/mongoose')


const app=express()

app.use(express.json())

app.use(newsRouter)
app.use(reportsRouter)



const port=3000
const multer=require('multer')
const uploads=multer({dest:'images',
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
// app.post('/uploads',uploads.single('uploads'),(req,res)=>{
//     res.send()
// })


app.listen(port,()=>console.log('server is running'))