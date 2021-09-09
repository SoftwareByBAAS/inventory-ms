import { asyncHandler } from '../middleware/asyncHandler';
import Product from '../models/Product';
import ErrorResponse from '../utils/errorResponse';

const createNewProduct = asyncHandler(async (req, res, next) => {
	const { categoryId, supplierId, description, quantity, name, unitType, price, meta, image } =
		req.body;

	const product = new Product({
		categoryId,
		supplierId,
		description,
		quantity,
		name,
		unitType,
		price,
		meta,
		image,
	});

	const data = await product.save();

	res.json({
		success: true,
		data: {
			product: data,
		},
	});
});

const getAllProducts = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const products = await Product.find()
		.skip(offset!)
		.limit(limit!)
		.populate('category')
		.populate('supplier')
		.exec();
	const totalDocuments = await Product.estimatedDocumentCount();

	res.json({
		success: true,
		data: {
			products,
			totalDocuments,
		},
	});
});

const getProductById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const product = await Product.findById(id).populate('category').populate('supplier');

	if (!product) {
		return next(new ErrorResponse('Product not found', 401));
	}

	res.json({
		success: true,
		data: {
			product,
		},
	});
});

const deleteProductById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const product = await Product.findByIdAndRemove(id);

	if (!product) {
		return next(new ErrorResponse('Product not found', 401));
	}

	res.json({
		success: true,
		data: {
			product,
		},
	});
});

const updateProductById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

	if (!product) {
		return next(new ErrorResponse('Product not found', 401));
	}

	await product.save();

	res.json({
		success: true,
		data: {
			product,
		},
	});
});

export { createNewProduct, getAllProducts, getProductById, deleteProductById, updateProductById };
