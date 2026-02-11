import { Router } from "express";
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "../../controllers/admin/brand.controller.js";

const router = Router();

router.route("/create").post(createBrand);
router.route("/update/:id").put(updateBrand);
router.route("/:id").delete(deleteBrand);
router.route("/:id").get(getBrand);
router.route("/").get(getAllBrand);

export default router;