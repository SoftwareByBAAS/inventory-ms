import { asyncHandler } from '../middleware/asyncHandler';
import Order from '../models/Order';
import ErrorResponse from '../utils/errorResponse';

const createNewOrder = asyncHandler(async (req, res, next) => {
	const { items, subTotal, total } = req.body;

	const order = new Order({
        items,
        subTotal,
        total
	});

	const data = await order.save();

	res.json({
		success: true,
		data: {
			order: data,
		},
	});
});

const getAllOrders = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const orders = await Order.find().skip(offset!).limit(limit!).exec();
	const totalDocuments = await Order.estimatedDocumentCount();

	res.json({
		success: true,
		data: {
			orders,
			totalDocuments,
		},
	});
});

const getOrderById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const order = await Order.findById(id);

	if (!order) {
		return next(new ErrorResponse('Order not found', 401));
	}

	res.json({
		success: true,
		data: {
			order,
		},
	});
});

const deleteOrderById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const order = await Order.findByIdAndRemove(id);

	if (!order) {
		return next(new ErrorResponse('Order not found', 401));
	}

	res.json({
		success: true,
		data: {
			order,
		},
	});
});

const updateOrderById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

	if (!order) {
		return next(new ErrorResponse('Order not found', 401));
	}

	await order.save();

	res.json({
		success: true,
		data: {
			order,
		},
	});
});

export { createNewOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById };
