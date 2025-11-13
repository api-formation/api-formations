import { Router } from "express";
import * as ctrl from "../controllers/training-followed.controller.js";

const formationsSuiviesRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: FormationsSuivies
 *   description: Gestion des formations suivies par les utilisateurs
 */

/**
 * @swagger
 * /api/formationssuivies/users/{idUser}/formations:
 *   get:
 *     summary: Récupérer toutes les formations suivies par un utilisateur
 *     tags: [FormationsSuivies]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de l'utilisateur
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *           example: javascript
 *         description: Filtrer les formations par nom
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Nombre maximal de résultats à retourner
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Décalage pour la pagination
 *     responses:
 *       200:
 *         description: Liste des formations suivies par l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 12
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
formationsSuiviesRoutes.get("/users/:idUser/formations", ctrl.findAllById);

/**
 * @swagger
 * /api/formationssuivies/users/{idUser}/formations/{idFormation}:
 *   get:
 *     summary: Récupérer une formation suivie spécifique par un utilisateur
 *     tags: [FormationsSuivies]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idFormation
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID de la formation
 *     responses:
 *       200:
 *         description: Détails de la formation suivie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idformation:
 *                   type: integer
 *                   example: 5
 *                 nom_formation:
 *                   type: string
 *                   example: Introduction à Node.js
 *                 date_suivi:
 *                   type: string
 *                   format: date
 *                   example: 2025-11-13
 *       404:
 *         description: Formation non trouvée
 *       500:
 *         description: Erreur serveur
 */
formationsSuiviesRoutes.get("/users/:idUser/formations/:idFormation", ctrl.findOneByUser);

/**
 * @openapi
 * /api/formationssuivies/users/{idUser}/formations/{idFormation}:
 *   post:
 *     summary: Créer une formation suivie par un utilisateur
 *     description: Lie un utilisateur existant à une formation. Cela crée une entrée dans la table `formationssuivies` avec la date de début automatique.
 *     tags:
 *       - FormationsSuivies
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: idFormation
 *         in: path
 *         required: true
 *         description: ID de la formation
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       201:
 *         description: Formation suivie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idformationsuivies:
 *                   type: integer
 *                   example: 12
 *                 datedebut:
 *                   type: string
 *                   format: date
 *                   example: 2025-11-13
 *                 datefin:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                   example: null
 *                 idformation:
 *                   type: integer
 *                   example: 3
 *                 iduser:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Requête invalide (ID manquant ou incorrect)
 *       404:
 *         description: Utilisateur ou formation non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

formationsSuiviesRoutes.post("/users/:idUser/formations/:idFormation", ctrl.createFormationForUser);


/**
 * @swagger
 * /api/formationssuivies/users/{idUser}/formations/{idFormation}:
 *   delete:
 *     summary: Supprimer une formation suivie par un utilisateur
 *     tags: [FormationsSuivies]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idFormation
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID de la formation à supprimer
 *     responses:
 *       204:
 *         description: Formation supprimée avec succès
 *       404:
 *         description: Formation non trouvée
 *       500:
 *         description: Erreur serveur
 */
formationsSuiviesRoutes.delete("/users/:idUser/formations/:idFormation", ctrl.deleteOneByUser);

export default formationsSuiviesRoutes;
