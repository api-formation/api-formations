import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../middleware/validation.middleware.js";

const authRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification (inscription et connexion)
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d’un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *               - email
 *               - mdp
 *               - age
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: Nathan
 *               nom:
 *                 type: string
 *                 example: Dupont
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nathan.dupont@example.com
 *               mdp:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *               age:
 *                 type: integer
 *                 example: 22
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur créé avec succès
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
authRoutes.post("/register", validateRegister, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d’un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - mdp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nathan.dupont@example.com
 *               mdp:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: nathan.dupont@example.com
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
authRoutes.post("/login", validateLogin, login);

export default authRoutes;
