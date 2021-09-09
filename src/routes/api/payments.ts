import express from "express";
const router = express.Router();
import { createNewPayment, getAllPayments, getPaymentById, updatePaymentById, deletePaymentById } from "../../controllers/payments";
import paginate from "../../middleware/paginate";

router.get("/", paginate, getAllPayments);

router.post("/", createNewPayment);

router.get("/:id", getPaymentById);

router.delete("/:id", deletePaymentById);

router.patch("/:id", updatePaymentById);

export default router;