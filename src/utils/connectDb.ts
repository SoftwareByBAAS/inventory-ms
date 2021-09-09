import mongoose, { ConnectOptions } from 'mongoose';

const connectDb = async () => {
	// TODO: Replace with production uri
	const uri = 'mongodb://localhost:27017/inventory-ms';
	const options: ConnectOptions = {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		await mongoose.connect(uri, options);

		console.log('Db Connected');
	} catch (error) {
		console.log(error.message);
	}
};

export default connectDb;
