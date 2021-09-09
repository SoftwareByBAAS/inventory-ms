import { asyncHandler } from '../middleware/asyncHandler';
import Supplier from '../models/Supplier';
import Product from '../models/Product';
import ErrorResponse from '../utils/errorResponse';

const createNewSupplier = asyncHandler(async (req, res, next) => {
	const { name, phone, email, address } = req.body;

	const supplier = new Supplier({
		name,
		phone,
		email,
		address,
	});

	const data = await supplier.save();

	res.json({
		success: true,
		data: {
			supplier: data,
		},
	});
});

const getAllSuppliers = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const suppliers = await Supplier.find().skip(offset!).limit(limit!).exec();
	const totalDocuments = await Supplier.estimatedDocumentCount();

	res.json({
		success: true,
		data: {
			suppliers,
			totalDocuments,
		},
	});
});

const getAllProductsBySupplier = asyncHandler(async (req, res, next) => {
	const supplierId = req.params.id;
	const { limit, offset } = req;

	const products = await Product.find({ supplierId: supplierId })
		.skip(offset!)
		.limit(limit!)
		.exec();

	res.json({
		success: true,
		data: {
			products,
		},
	});
});

const getSupplierById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const supplier = await Supplier.findById(id);

	if (!supplier) {
		return next(new ErrorResponse('Supplier not found', 401));
	}

	res.json({
		success: true,
		data: {
			supplier,
		},
	});
});

const deleteSupplierById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const supplier = await Supplier.findByIdAndRemove(id);

	if (!supplier) {
		return next(new ErrorResponse('Supplier not found', 401));
	}

	res.json({
		success: true,
		data: {
			supplier,
		},
	});
});

const updateSupplierById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });

	if (!supplier) {
		return next(new ErrorResponse('Supplier not found', 401));
	}

	await supplier.save();

	res.json({
		success: true,
		data: {
			supplier,
		},
	});
});

export {
	createNewSupplier,
	getAllSuppliers,
	getSupplierById,
	deleteSupplierById,
	updateSupplierById,
	getAllProductsBySupplier,
};
