import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategories, updateCategory } from "../../controllers/admin/category.controller.js";

const router = Router();

router.route("/create").post(createCategory);
router.route("/update/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);
router.route("/:id").get(getCategories);
router.route("/").get(getAllCategories);

export default router;