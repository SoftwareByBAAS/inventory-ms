import express from "express";
const router = express.Router();
import { createNewCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, getAllProductsByCategory } from "../../controllers/categories";
import paginate from "../../middleware/paginate";

router.get("/", paginate, getAllCategories);

router.get("/products/:id", paginate, getAllProductsByCategory );

router.post("/", createNewCategory);

router.get("/:id", getCategoryById);

router.delete("/:id", deleteCategoryById);

router.patch("/:id", updateCategoryById);

export default router;