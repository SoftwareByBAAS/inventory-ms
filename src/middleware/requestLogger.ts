import { Response } from 'express';
import moment from 'moment';
import { RequestHandler } from '../types';

const requestLogger: RequestHandler = (req, res, next) => {
	console.log(`*************** REQUEST ***************`);
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
	console.log(`${req.method} ${req.path}`);
	console.log('Body: ', req.body);
	console.log('Query: ', req.query);
	res.on('finish', function (this: Response) {
		let timestamps = moment().format('MM-DD-YYYY HH:mm:ss');

		console.log(timestamps, this.statusCode);
		console.log(`*************** REQUEST END **************`);
	});
	next();
};

export default requestLogger;
