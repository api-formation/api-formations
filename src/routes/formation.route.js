import { Router } from "express";
import * as ctrl from "../controllers/formation.controller.js";
const formationsRoutes = Router();

formationsRoutes.get("/", ctrl.listFormations);
formationsRoutes.get("/:id", ctrl.getFormation);
formationsRoutes.post("/", ctrl.createFormation);
formationsRoutes.put("/:id", ctrl.updateFormation);
formationsRoutes.delete("/:id", ctrl.deleteFormation);

export default formationsRoutes;



