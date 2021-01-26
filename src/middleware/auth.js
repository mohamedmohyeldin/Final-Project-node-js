  
const jwt=require('jsonwebtoken')
const Reporters=require('../models/reporters2')


const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decode=jwt.verify(token,'news-app')
        const reporters= await Reporters.findOne({_id:decode._id,'tokens.token':token})
        console.log(reporters)
        if(!reporters){
            throw new Error()
        }
        req.reporters=reporters
        req.token=token
        next()
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}

module.exports=auth

    }
    catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}


module.exports = auth