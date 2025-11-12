import { Router } from "express";
import * as ctrl from "../controllers/formation.controller.js";

const formationsRoutes = Router();

/**
 * @openapi
 * /api/formations:
 *   get:
 *     summary: Get all formations
 *     responses:
 *       200:
 *         description: A list of formations
 */
formationsRoutes.get("/", ctrl.listFormations);

/**
 * @openapi
 * /api/formations/{id}:
 *   get:
 *     summary: Get a formation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested formation
 *       404:
 *         description: Formation not found
 */
formationsRoutes.get("/:id", ctrl.getFormation);

/**
 * @openapi
 * /api/formations:
 *   post:
 *     summary: Create a new formation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               prix:
 *                 type: number
 *               duration:
 *                 type: number
 *               nbVideos:
 *                 type: number
 *               dateMiseEnLigne:
 *                 type: string
 *                 format: date
 *               langue:
 *                 type: string
 *               nbParticipants:
 *                 type: number
 *               idCategorie:
 *                 type: number
 *               idContent:
 *                 type: number
 *     responses:
 *       201:
 *         description: Formation created successfully
 */
formationsRoutes.post("/", ctrl.createFormation);

/**
 * @openapi
 * /api/formations/{id}:
 *   put:
 *     summary: Update a formation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Formation updated successfully
 *       404:
 *         description: Formation not found
 */
formationsRoutes.put("/:id", ctrl.updateFormation);

/**
 * @openapi
 * /api/formations/{id}:
 *   delete:
 *     summary: Delete a formation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formation deleted successfully
 *       404:
 *         description: Formation not found
 */
formationsRoutes.delete("/:id", ctrl.deleteFormation);

export default formationsRoutes;
