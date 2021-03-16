const mongoose=require('mongoose');
const Schema=mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');

var SubcriberSchema = mongoose.Schema({
    _id: {
        type:Number,
    },
    topic: {
        type: mongoose.Schema.Types.String,
        ref: "Topic" 
    },
    url: {
      type: String
    },
    notes: {
        types :  Array
    },
    created_at:{
        type:Date,
    	require:true
    }
});
// Auto increment is use so as to have a whole number as an id.
SubcriberSchema.plugin(autoIncrement.plugin,  'Subcriber');
module.exports = mongoose.model('Subcriber', SubcriberSchema);