import mongoose from 'mongoose';
import config from './index';

const connectDb = async (): Promise<void> => {
	try {
		await mongoose.connect(config.getMongoUrl(), {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Db Connected...');
	} catch (error) {
		console.log(error);
	}
};

export default connectDb;
