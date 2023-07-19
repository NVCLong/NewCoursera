const mongoose= require('mongoose')
const Schema= mongoose.Schema

const News=new Schema({
    title: {type: String, minLength: 1, maxLength: 30},
    body: {type: String, minLength: 1, maxLength: 600},
    image: {type: String, minLength: 1, maxLength: 200},
    author:{type:String,minLength:1, maxLength: 30},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})
module.exports=mongoose.model('News',News)