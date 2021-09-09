import { asyncHandler } from '../middleware/asyncHandler';
import Category from '../models/Category';
import Product from '../models/Product';
import ErrorResponse from '../utils/errorResponse';

const createNewCategory = asyncHandler(async (req, res, next) => {
	const { name, description } = req.body;

	const category = new Category({
		name,
		description,
	});

	const data = await category.save();

	res.json({
		success: true,
		data: {
			category: data,
		},
	});
});

const getAllCategories = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const categories = await Category.find().skip(offset!).limit(limit!).exec();
	const totalDocuments = await Category.estimatedDocumentCount();

	res.json({
		success: true,
		data: {
			categories,
			totalDocuments,
		},
	});
});

const getAllProductsByCategory = asyncHandler(async (req, res, next) => {
	const categoryId = req.params.id;
	const { limit, offset } = req;

	const products = await Product.find({ categoryId: categoryId })
		.skip(offset!)
		.limit(limit!)
		.exec();
	const totalDocuments = await Product.where('categoryId').equals(categoryId).countDocuments();

	res.json({
		success: true,
		data: {
			products,
			totalDocuments,
		},
	});
});

const getCategoryById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const category = await Category.findById(id);

	if (!category) {
		return next(new ErrorResponse('Category not found', 401));
	}

	res.json({
		success: true,
		data: {
			category,
		},
	});
});

const deleteCategoryById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const category = await Category.findByIdAndRemove(id);

	if (!category) {
		return next(new ErrorResponse('Category not found', 401));
	}

	res.json({
		success: true,
		data: {
			category,
		},
	});
});

const updateCategoryById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

	if (!category) {
		return next(new ErrorResponse('Category not found', 401));
	}

	await category.save();

	res.json({
		success: true,
		data: {
			category,
		},
	});
});

export {
	createNewCategory,
	getAllCategories,
	getCategoryById,
	deleteCategoryById,
	updateCategoryById,
	getAllProductsByCategory,
};
