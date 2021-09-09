import express from "express";
const router = express.Router();
import { createNewProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from "../../controllers/products";
import paginate from "../../middleware/paginate";

router.get("/", paginate, getAllProducts);

router.post("/", createNewProduct);

router.get("/:id", getProductById);

router.delete("/:id", deleteProductById);

router.patch("/:id", updateProductById);

export default router;