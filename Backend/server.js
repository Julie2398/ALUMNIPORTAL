// require express
var express = require('express')
var app = express();

const path = require('path');
const port = process.env.PORT || 3300;
app.use(express.static('./dist/CS5610-web-dev-project'));

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// require mongoose
// var connectionString = 'mongodb://127.0.0.1:27017/job-portal'; // for local
// if(process.env.MLAB_USERNAME) { // check if running remotely
//     var username = process.env.MLAB_USERNAME; // get from environment
//     var password = process.env.MLAB_PASSWORD;
//     connectionString = 'mongodb://' + username + ':' + password;
//     connectionString += '@ds115931.mlab.com:15931/heroku_xb8r295c'; // user yours
// }

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user1:user1@casestudy.4jdff.mongodb.net/ICTAKJOB?retryWrites=true&w=majority').then();
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('connected with mongoose');
// });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        req.headers.origin);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var userService = require('./services/user.service.server');
userService(app);

var skillService = require('./services/skill.service.server');
skillService(app);

var awardService = require('./services/award.service.server');
awardService(app);

var certificateService = require('./services/certificate.service.server');
certificateService(app);

var educationService = require('./services/education.service.server');
educationService(app);

var extraCurricularService = require('./services/extra-curricular.service.server');
extraCurricularService(app);

var experienceService = require('./services/experience.service.server');
experienceService(app);

var jobApplicationService = require('./services/job-application.service.server');
jobApplicationService(app);

var jobPostingService = require('./services/job-posting.service.server');
jobPostingService(app);

var projectService = require('./services/project.service.server');
projectService(app);

var recruiterService = require('./services/recruiter-detail.service.server');
recruiterService(app);



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/CS5610-web-dev-project/index.html'));
  });
  app.listen(port,()=>{console.log("Server Ready at" +port)});