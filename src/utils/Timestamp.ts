import { Schema, Document, Model, SchemaOptions } from 'mongoose';
import config from './config';
import moment from 'moment';

export interface TimestampDocument extends Document {
    createdAt: Date | string;
    updatedAt: Date | string;
    getCreatedAtString: () => string;
    getUpdatedAtString: () => string;
}

export default class TimestampSchema<
    D = Document<any, any, any>,
    M extends Model<D, any, any> = Model<any, any, any>
> extends Schema<D, M> {
    constructor(schema: Object, options?: SchemaOptions) {
        // Create the schema
        super(schema, options);
        // Add createdAt and updatedAt fields
        this.add({
            createdAt: {
                type: Date,
                default: function () {
                    return new Date();
                },
            },
            updatedAt: {
                type: Date,
                default: function () {
                    return new Date();
                },
            },
        });
        // Add hooks
        this.pre('save', function (next) {
            this.updatedAt = new Date();
            next();
        });
        // Add methods
        this.methods.getCreatedAtString = function (): string {
            return moment(this.createdAt).format(config.getDateString());
        };
        this.methods.getUpdatedAtString = function (): string {
            return moment(this.updatedAt).format(config.getDateString());
        };
    }
}