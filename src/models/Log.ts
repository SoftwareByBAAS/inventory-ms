import { Schema, model, Model } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

export interface IChangeItem {
	itemId: string;
	itemName: string;
	itemType: 'product' | 'category' | 'supplier';
	changedField: string;
	from: any;
	to: any;
}

export interface ILog {
	changes: IChangeItem[];
}

export interface LogDocument extends ILog, TimestampDocument {}

export type JsonLog = Partial<LogDocument>;

export interface LogModel extends Model<LogDocument> {}

const LogSchema = new TimestampSchema<LogDocument, LogModel>({
	changes: [
		{
			itemId: {
				type: String,
				required: true,
			},
			itemName: {
				type: String,
				required: true,
			},
			itemType: {
				type: String,
				required: true,
				enum: ['product', 'category', 'supplier'],
			},
			changedField: {
				type: String,
				required: true,
			},
			from: {
				type: Schema.Types.Mixed,
				required: true,
			},
			to: {
				type: Schema.Types.Mixed,
				required: true,
			},
		},
	],
});

LogSchema.set('toJSON', {
	transform: (doc: LogDocument, returnedObject: JsonLog) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<LogDocument>('Log', LogSchema);
