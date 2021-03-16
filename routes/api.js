const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    return res.json({
       welcome_note: 'Welcome to Http Notification System',
     });
});

// Controllers for the whole logic of the system
const apiCtrl = require('../controllers/api.controller');

// Api Routes 
router.post('/topic', apiCtrl.create_topic);
router.post('/subcribe/:topic', apiCtrl.subcribe);

module.exports = router;