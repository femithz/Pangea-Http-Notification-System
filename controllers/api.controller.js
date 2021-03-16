const mongoose = require('mongoose');
const Topic = require('../models/topic');
const Subcriber = require('../models/subcriber');


module.exports = {
    // create comment for randpost
    create_topic: async ( req, res, next) => {
        let body = {
            topic: req.body.topic,
            created_at: Date.now()
        }  
        // Save comment
        let new_topic = new Topic(body);
        new_topic
        .save()
        .then(topic => {
            res.status(200).json({
                topic: topic,
                message: "you just create topic."
              });
        })
        .catch(err => {
          return  res.status(500).json({
                error: err
              })
        });
    },
    // subcribe to a topic
    subcribe: async (req, res, next) => {
      let topic = req.params.topic;
      console.log(topic);
      Topic.findOne({topic: req.params.topic }, (err, topic) => { 
        if (!topic) {
            return res.status(500).json({message: 'Topic with this name does not exist'})
        }
      })
    }
}