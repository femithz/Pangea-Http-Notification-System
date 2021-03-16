const mongoose = require('mongoose');
const Topic = require('../models/topic');
const Subcriber = require('../models/subcriber');


module.exports = {
    // create comment for randpost
    create_topic: async ( req, res) => {
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
    subcribe: async (req, res) => {
      Topic.findOne({topic: req.params.topic }, (err, topic) => { 
        if (err) {
            return res.status(500).json({message: 'An error occureed'})
        } else {
          if(!topic){
            return res.status(500).json({message: 'No topic with this name'})
          } else {
            let body = {
              topic: topic.topic,
              url:  'http:// ' + req.get('host')
            }
            let subcribe = new Subcriber(body);
            subcribe
            .save()
            .then(result => {
                res.status(200).json({
                    topic: result.topic,
                    data: result,
                    message: `you just subcribe to this topic ${topic} .`
                  });
            })
            .catch(err => {
              return  res.status(500).json({
                    error: err
                  })
            });
          }
        }
      })
    },
    // Function to publish to a particular topic
    publish: async (req, res) => {
      Topic.findOne({topic: req.params.topic }, (err, topic) => { 
        if (err) {
            return res.status(500).json({message: 'An error occureed'})
        } else {
          if(!topic){
            return res.status(500).json({message: 'No topic with this name'})
          } else {
            let body = {
              // topic: topic.topic,
              topic_name: req.body.topic_name,
              publish_date: Date.now()   
            }
            topic.topic_message = body;
            topic
            .save()
            .then(result => {
                 // Function to look For subcriber 
                 Subcriber.find({topic: req.params.topic}, (err, subcriber) => {
                   console.log(subcriber);
                    subcriber.note  = result;
                    subcriber.save().then(data => {
                    res.status(200).json({
                      topic: result.topic,
                      data: result,
                      message: `you just subcribe to this topic ${topic} .`
                    });
                    })
                 }) 
            })
            .catch(err => {
              return  res.status(500).json({
                    error: err
                  })
            });
          }
        }
      })
    }
    
}