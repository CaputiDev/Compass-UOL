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
},{
    toJSON:{
        virtuals:true
    }
});

HouseSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3010/files/${this.thumbnail}`;
})
module.exports = new model('House', HouseSchema)