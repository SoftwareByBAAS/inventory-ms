import { Schema, model, Model } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

export interface IPayment {
    amount: number;
    currency: string;
    status: string;
    email: string;
    stripeId: string;
}

export interface PaymentDocument extends IPayment, TimestampDocument {}

export type JsonPayment = Partial<PaymentDocument>;

export interface PaymentModel extends Model<PaymentDocument> {}

const PaymentSchema = new TimestampSchema<PaymentDocument, PaymentModel>({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    }
});

PaymentSchema.set('toJSON', {
	transform: (doc: PaymentDocument, returnedObject: JsonPayment) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<PaymentDocument>('Payment', PaymentSchema);
