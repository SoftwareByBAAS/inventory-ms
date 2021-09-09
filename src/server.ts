import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
import routes from './routes/index';
import errorHandler from './middleware/errorHandler';
import connectDb from './utils/connectDb';
import requestLogger from './middleware/requestLogger';
import config from './config';
import redis from './config/redis';

connectDb();
redis.connect();

app.use(express.json());
app.use(requestLogger);

app.use('/', routes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Server on');
});

app.use(errorHandler);

app.listen(config.getPort(), () => {
	console.log(`Server running on port ${config.getPort()}`);
});
