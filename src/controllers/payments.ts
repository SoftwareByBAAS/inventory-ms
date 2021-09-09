import { asyncHandler } from '../middleware/asyncHandler';
import Payment from '../models/Payment';
import ErrorResponse from '../utils/errorResponse';

const createNewPayment = asyncHandler(async (req, res, next) => {
	const { amount, currency, status, email, stripeId } = req.body;

	const payment = new Payment({
        amount,
        currency,
        status,
        email,
        stripeId
	});

	const data = await payment.save();

	res.json({
		success: true,
		data: {
			payment: data,
		},
	});
});

const getAllPayments = asyncHandler(async (req, res, next) => {
	const { limit, offset } = req;

	const payments = await Payment.find().skip(offset!).limit(limit!).exec();
	const totalDocuments = await Payment.estimatedDocumentCount();

	res.json({
		success: true,
		data: {
			payments,
			totalDocuments,
		},
	});
});

const getPaymentById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const payment = await Payment.findById(id);

	if (!payment) {
		return next(new ErrorResponse('Payment not found', 401));
	}

	res.json({
		success: true,
		data: {
			payment,
		},
	});
});

const deletePaymentById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const payment = await Payment.findByIdAndRemove(id);

	if (!payment) {
		return next(new ErrorResponse('Payment not found', 401));
	}

	res.json({
		success: true,
		data: {
			payment,
		},
	});
});

const updatePaymentById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const payment = await Payment.findByIdAndUpdate(id, req.body, { new: true });

	if (!payment) {
		return next(new ErrorResponse('Payment not found', 401));
	}

	await payment.save();

	res.json({
		success: true,
		data: {
			payment,
		},
	});
});

export { createNewPayment, getAllPayments, getPaymentById, deletePaymentById, updatePaymentById };
