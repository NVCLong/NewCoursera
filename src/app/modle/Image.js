const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        name:{
            type: String,
            require: true,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Avatar', AvatarSchema);
