const mongoose=require('mongoose')

const NewsSchema=mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        trim:true
    },
    author:{
        type:String,
        trim:true,
        required:true
    },
    avatar:{
        type:Buffer
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'Reporters'
    },
    date:{
            type: String,
           default:new Date(),
           
           
        },
        
    
    

},{
    timestamps:true
    
})


Date.prototype.addHours = function() {
    this.setTime(this.getTime() + 2);
    return this;
  }


const News=mongoose.model('News',NewsSchema)
module.exports=News