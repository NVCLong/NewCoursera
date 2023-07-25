const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Jobs=new Schema({
    name:{type:String,minLength:8, maxLength:200, require:true },
    description:{type:String,minLength: 30,maxLength: 600, require: true},
    company:{type:String,minLength:8, maxLength:200,require: true},
    requirement:{type:String,minLength: 8, maxLength:200},
    salary:{type:Number},
    userupload:{type:Boolean,default:false}
})
module.exports=mongoose.model("Jobs",Jobs)