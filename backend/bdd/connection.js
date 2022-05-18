var mongoose = require('mongoose');

const admin = 'admin';
const pass = 'adMiN$123$123';
const projectName = 'musicmoviemood';
const uri =`mongodb+srv://${admin}:${pass}@${projectName}.2qzfh.mongodb.net/${projectName}?retryWrites=true&w=majority`;

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database !");
    }
});

module.exports = mongoose;