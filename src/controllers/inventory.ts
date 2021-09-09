import { asyncHandler } from '../middleware/asyncHandler';
import Log from '../models/Log';
import Product, { ProductDocument } from '../models/Product';
import { IChangeItem } from '../models/Log';
import ErrorResponse from '../utils/errorResponse';
import moment from 'moment';

interface IProductInfo {
	productId: string;
	quantity: number;
	name?: string;
}

const getLogs = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const logs = await Log.find().skip(offset!).limit(limit!);

	res.status(200).json({
		success: true,
		data: {
			logs,
		},
	});
});

const getInventoryReport = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const products = await Product.find().skip(offset!).limit(limit!).exec();

	if (!products) {
		return next(new ErrorResponse('Could not find any products', 401));
	}

	let productsReport: IProductInfo[] = [];
	products.map(product => {
		const productInfo: IProductInfo = {
			name: product.name,
			productId: product.id,
			quantity: product.quantity,
		};
		productsReport.push(productInfo);
	});

	res.json({
		success: true,
		data: {
			report: productsReport,
		},
	});
});

const getInventoryReportByProduct = asyncHandler(async (req, res, next) => {
	const productId = req.params.id;
	const thirtyDaysAgo = moment().subtract(30, 'days').valueOf();

	const logs = await Log.find().where('createdAt').gte(thirtyDaysAgo);

	const recentChanges: IChangeItem[] = [];
	logs.forEach(log => {
		log.changes.forEach(change => {
			if (change.itemId === productId) {
				recentChanges.push(change);
			}
		});
	});

	res.json({
		success: true,
		data: {
			productChanges: recentChanges,
		},
	});
});

const getInventoryReportByCategory = asyncHandler(async (req, res, next) => {
	const categoryId = req.params.id;
	const { limit, offset } = req;

	const products = await Product.find({ categoryId: categoryId })
		.skip(offset!)
		.limit(limit!)
		.exec();

	if (!products) {
		return next(new ErrorResponse('Could not find any products in this category', 401));
	}

	let productsReport: IProductInfo[] = [];
	products.map(product => {
		const productInfo: IProductInfo = {
			name: product.name,
			productId: product.id,
			quantity: product.quantity,
		};
		productsReport.push(productInfo);
	});

	res.json({
		success: true,
		data: {
			report: productsReport,
		},
	});
});

const getInventoryReportBySupplier = asyncHandler(async (req, res, next) => {
	const supplierId = req.params.id;
	const { limit, offset } = req;

	const products = await Product.find({ supplierId: supplierId })
		.skip(offset!)
		.limit(limit!)
		.exec();

	if (!products) {
		return next(new ErrorResponse('Could not find any products for this supplier', 401));
	}

	let productsReport: IProductInfo[] = [];
	products.map(product => {
		const productInfo: IProductInfo = {
			name: product.name,
			productId: product.id,
			quantity: product.quantity,
		};
		productsReport.push(productInfo);
	});

	res.json({
		success: true,
		data: {
			report: productsReport,
		},
	});
});

const inventoryIn = asyncHandler(async (req, res, next) => {
	const changes: IProductInfo[] = req.body.changes;

	let changeItems: IChangeItem[] = [];

	for (let i = 0; i < changes.length; i++) {
		const { productId, quantity } = changes[i];

		const product = await Product.findById(productId);

		if (!product) {
			return next(new ErrorResponse('Product not found', 401));
		}

		const newQuantity = quantity + product.quantity;
		const newChangeItem: IChangeItem = {
			itemId: productId,
			itemType: 'product',
			itemName: product.name,
			changedField: 'quantity',
			from: product.quantity,
			to: newQuantity,
		};

		changeItems.push(newChangeItem);

		await product.updateQuantity(newQuantity);
	}

	const log = new Log({
		changes: changeItems,
	});

	const data = await log.save();

	res.json({
		success: true,
		data: {
			log: data,
		},
	});
});

const inventoryOut = asyncHandler(async (req, res, next) => {
	const changes: IProductInfo[] = req.body.changes;

	let changeItems: IChangeItem[] = [];

	for (let i = 0; i < changes.length; i++) {
		const { productId, quantity } = changes[i];

		const product = await Product.findById(productId);

		if (!product) {
			return next(new ErrorResponse('Product not found', 401));
		}

		if (quantity > product.quantity) {
			return next(
				new ErrorResponse(
					`You tried to remove ${quantity} products, but there are only ${product.quantity}`,
					401
				)
			);
		}

		const newQuantity = product.quantity - quantity;
		const newChangeItem: IChangeItem = {
			itemId: productId,
			itemType: 'product',
			itemName: product.name,
			changedField: 'quantity',
			from: product.quantity,
			to: newQuantity,
		};

		changeItems.push(newChangeItem);

		await product.updateQuantity(newQuantity);
	}

	const log = new Log({
		changes: changeItems,
	});

	const data = await log.save();

	res.json({
		success: true,
		data: {
			log: data,
		},
	});
});

export {
	getLogs,
	inventoryIn,
	inventoryOut,
	getInventoryReport,
	getInventoryReportByCategory,
	getInventoryReportBySupplier,
	getInventoryReportByProduct,
};
