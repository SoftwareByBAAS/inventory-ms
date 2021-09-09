import express from 'express';
const router = express.Router();
import {
	getInventoryReport,
	inventoryIn,
	inventoryOut,
	getInventoryReportByCategory,
	getInventoryReportBySupplier,
	getInventoryReportByProduct,
	getLogs,
} from '../../controllers/inventory';
import paginate from '../../middleware/paginate';

router.get('/logs', paginate, getLogs);

router.get('/report', paginate, getInventoryReport);

router.get('/report/:id', paginate, getInventoryReportByProduct);

router.get('/category/:id', paginate, getInventoryReportByCategory);

router.get('/supplier/:id', paginate, getInventoryReportBySupplier);

router.post('/in', inventoryIn);

router.post('/out', inventoryOut);

export default router;
