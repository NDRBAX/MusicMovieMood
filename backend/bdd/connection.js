var mongoose = require('mongoose');
require('dotenv').config();

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI, options, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('connected to mongodb');
	}
});
