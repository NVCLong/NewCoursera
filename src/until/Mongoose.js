



module.exports={
    multipleMongooseToObject: function (mongooseArray){
        return mongooseArray.map(function (course) {
            return course.toObject()
        })
    },
    mongooseToObject: function (mongooses){
        return mongooses.toObject()
    }
}