const mongoose=require('mongoose');
const Schema=mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');

var TopicSchema = mongoose.Schema({
    _id: {
        type:Number,
    },
    topic: {
        type: String,
        required: true
    },
    topic_message: {
      type: Array
    },
    created_at:{
        type:Date,
    	require:true
    }
});
// Auto increment is use so as to have a whole number as an id.
TopicSchema.plugin(autoIncrement.plugin,  'Topic');
module.exports = mongoose.model('Topic', TopicSchema);