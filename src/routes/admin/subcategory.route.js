import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategories, updateSubCategory } from "../../controllers/admin/subCategory.controller.js";

const router = Router();

router.route("/create").post(createSubCategory);
router.route("/update/:id").put(updateSubCategory);
router.route("/:id").post(updateSubCategory);
router.route("/:id").delete(deleteSubCategory);
router.route("/:id").get(getSubCategories);
router.route("/").get(getAllSubCategories);

export default router;