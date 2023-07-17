const mongoose=require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: {type: String, minLength: 1, maxLength: 30},
    description: {type: String, minLength: 1, maxLength: 30},
    image: {type: String, minLength: 1, maxLength: 200},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},

});
module.exports=mongoose.model('Course',Course)