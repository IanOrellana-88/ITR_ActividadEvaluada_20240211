import express from "express";
import specialitiesController from "../controllers/specialitiesController.js";

const router = express.Router();

router.route("/").get(specialitiesController.getSpecialities);
router.route("/").post(specialitiesController.createSpeciality);
router.route("/:id").delete(specialitiesController.deleteSpeciality);
router.route("/:id").put(specialitiesController.updateSpeciality);

export default router;

