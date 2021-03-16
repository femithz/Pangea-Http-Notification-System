var express=require('express');
var session = require('express-session');
var path=require('path');
var dotenv = require('dotenv').config();
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors = require('cors');
var autoIncrement = require('mongoose-auto-increment');

// const URL = 'mongodb://softork2019:softork2019@ds155862.mlab.com:55862/ufitgethostel';
const uri = "mongodb+srv://femithz:1234567890@cluster0.uyy5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Database connection setup 
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
 }).then(
  (res) => {
    console.log("Database connection successful");
  }
).catch((err) => {
  console.log(err);
});
autoIncrement.initialize(mongoose.connection);

// intialize express instance
var app = express();


// declare routing section
const apiRouter = require('./routes/api');

// const commentRouter = require('./routes/comment');
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// view engine setup

app.use(express.static(path.join(__dirname, 'public')));


// Api endpoint setup
app.use('/', apiRouter);



app.listen(port, () => {
         console.log('Server is running on' + '--' + port);        
})




