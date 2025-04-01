const {Schema, model} = require('mongoose');

const HouseSchema = new Schema({

    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = new model('House', HouseSchema)