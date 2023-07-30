const mongoose = require('mongoose');
const Schema=mongoose.Schema

const SubCourse= new mongoose.Schema(
    {
    mainCourse: {type: String, require: true},
    course:[
        {
            name: String,
            description: String,
            sub_slug: String,
            vidId: String,
        }
        ],
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
},
    {
    timestamps:true
}
)


module.exports=mongoose.model('SubCourse',SubCourse)