const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');


// const key = "mongodb+srv://stepan:stepan123@cluster0.djete.mongodb.net/<dbname>?retryWrites=true&w=majority";
const key = "mongodb+srv://stepan:stepan123@cluster0.wsbgb.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
	try {
		await mongoose.connect(key, {
			useNewUrlParser: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
