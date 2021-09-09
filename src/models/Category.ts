import { Schema, Document, model, Model } from 'mongoose';
import TimestampSchema, { TimestampDocument } from '../utils/Timestamp';

export interface ICategory extends Document {
	name: string;
	description: string;
}

export interface CategoryDocument extends ICategory, TimestampDocument {}

export type JsonCategory = Partial<CategoryDocument>;

export interface CategoryModel extends Model<CategoryDocument> {}

const CategorySchema = new TimestampSchema<CategoryDocument, CategoryModel>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

CategorySchema.set('toJSON', {
	transform: (doc: CategoryDocument, returnedObject: JsonCategory) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.createdAt = doc.getCreatedAtString();
		returnedObject.updatedAt = doc.getUpdatedAtString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<CategoryDocument>('Category', CategorySchema);
