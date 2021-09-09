import { model, Model, Document } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

interface ISupplier extends Document{
	name: string;
	phone: string;
	email: string;
}

export interface SupplierDocument extends ISupplier, TimestampDocument {}

export type JsonUser = Partial<SupplierDocument>;

export interface SupplierModel extends Model<SupplierDocument> {}

const SupplierSchema = new TimestampSchema<SupplierDocument, SupplierModel>({
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		lineOne: {
			type: String,
			required: true,
		},
		lineTwo: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		required: false,
	},
});

SupplierSchema.set('toJSON', {
	transform: (doc: SupplierDocument, returnedObject: JsonUser) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<SupplierDocument>('Supplier', SupplierSchema);
