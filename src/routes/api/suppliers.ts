import express from "express";
const router = express.Router();
import { createNewSupplier, getAllSuppliers, getSupplierById, updateSupplierById, deleteSupplierById, getAllProductsBySupplier } from "../../controllers/suppliers";
import paginate from "../../middleware/paginate";

router.get("/", paginate ,getAllSuppliers);

router.get("/products/:id", paginate ,getAllProductsBySupplier);

router.post("/", createNewSupplier);

router.get("/:id", getSupplierById);

router.delete("/:id", deleteSupplierById);

router.patch("/:id", updateSupplierById);

export default router;