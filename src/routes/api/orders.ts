import express from "express";
const router = express.Router();
import { createNewOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } from "../../controllers/orders";
import paginate from "../../middleware/paginate";

router.get("/", paginate, getAllOrders);

router.post("/", createNewOrder);

router.get("/:id", getOrderById);

router.delete("/:id", deleteOrderById);

router.patch("/:id", updateOrderById);

export default router;