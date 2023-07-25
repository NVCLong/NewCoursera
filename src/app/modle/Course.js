const mongoose=require('mongoose')
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: {type: String, minLength: 1, maxLength: 100, require: true},
    description: {type: String, minLength: 1, maxLength: 600},
    image: {type: String, minLength: 1, maxLength: 200},
    vidId: {type: String, minLength: 1, maxLength: 200},
    userupload:{type:Boolean, default:false},
    slug: {type: String, maxLength:200},
},{
    timestamps:true
});
Course.pre('save', function(next) {
    this.slug = slugify(this.name);
    next();
});
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
module.exports=mongoose.model('Course',Course)