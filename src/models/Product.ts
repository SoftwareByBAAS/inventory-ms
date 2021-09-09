import { model, Model } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

interface IProduct {
	categoryId: string;
	supplierId: string;
	description: string;
	quantity: number;
	name: string;
	unitType: string;
	price: number;
	meta?: Map<String, String>;
	image?: string;
}

export interface ProductDocument extends IProduct, TimestampDocument {
	updateQuantity: (newQuantity: number) => Promise<void>;
}

export type JsonProduct = Partial<ProductDocument>;

export interface ProductModel extends Model<ProductDocument> {}

const ProductSchema = new TimestampSchema<ProductDocument, ProductModel>({
	category: {
		type: String,
		required: true,
	},
	supplier: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	unitType: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	meta: {
		type: Map,
		required: false,
	},
	image: {
		type: String,
		required: false,
	},
});

ProductSchema.methods.updateQuantity = async function (newQuantity: number): Promise<void> {
	await this.updateOne({
		$set: {
			quantity: newQuantity,
		},
	});
};

ProductSchema.set('toJSON', {
	transform: (doc: ProductDocument, returnedObject: JsonProduct) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<ProductDocument>('Product', ProductSchema);
