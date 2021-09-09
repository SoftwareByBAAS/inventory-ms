import { Schema, model, Model } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

export interface IOrderItem {
	name: string;
    quantity: number;
}

export interface IOrder {
	items: IOrderItem[];
    subTotal: number;
    total: number;
}

export interface OrderDocument extends IOrder, TimestampDocument {}

export type JsonOrder = Partial<OrderDocument>;

export interface OrderModel extends Model<OrderDocument> {}

const OrderSchema = new TimestampSchema<OrderDocument, OrderModel>({
	items: [
		{
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
            }
		},
	],
    subTotal: {
        type: Number,
        required: true, 
    },
    total: {
        type: Number,
        required: true, 
    }
});

OrderSchema.set('toJSON', {
	transform: (doc: OrderDocument, returnedObject: JsonOrder) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<OrderDocument>('Order', OrderSchema);
