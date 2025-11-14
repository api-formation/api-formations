// src/controllers/formation.controller.js

import { Formation } from "../models/formation.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

// ---------------------------------------------------------
// LIST
// ---------------------------------------------------------
export const listFormations = async (req, res, next) => {
    try {
        if (!JWT_SECRET) {
            console.error("JWT_SECRET missing in env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const { q, limit = 50, offset = 0 } = req.query;
        let data = await Formation.findAll();

        // Filtre
        if (q) {
            const query = String(q).toLowerCase();
            data = data.filter(f =>
                String(f.titre).toLowerCase().includes(query)
            );
        }

        // Pagination
        const start = Number(offset);
        const end = start + Number(limit);

        return res.status(200).json({
            total: data.length,
            data: data.slice(start, end),
        });
    } catch (e) {
        next(e);
    }
};

// ---------------------------------------------------------
// GET BY ID
// ---------------------------------------------------------
export const getFormation = async (req, res, next) => {
    try {
        if (!JWT_SECRET) {
            console.error("JWT_SECRET missing in env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const formation = await Formation.findById(Number(req.params.id));

        if (!formation) {
            return res.status(404).json({ error: "Formation non trouvée" });
        }

        return res.status(200).json(formation);
    } catch (e) {
        next(e);
    }
};

// ---------------------------------------------------------
// CREATE
// ---------------------------------------------------------
export const createFormation = async (req, res, next) => {
    try {
        if (!req.session?.role || !["admin", "author"].includes(req.session.role)) {
            return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET missing in env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const {
            titre,
            prix,
            description,
            duration,
            nbVideos,
            dateMiseEnLigne,
            langue,
            nbParticipants,
            idCategorie,
            idContent,
        } = req.body;

        if (!titre || !description) {
            return res
                .status(400)
                .json({ error: "Titre et description sont obligatoires" });
        }

        const userId = req.user?.idUser || req.user?.id || req.body.idUser;
        if (!userId) {
            return res.status(400).json({
                error: "userId est requis pour créer une formation (log Mongo).",
            });
        }

        const created = await Formation.createOne(
            {
                titre,
                prix,
                description,
                duration,
                nbVideos,
                dateMiseEnLigne,
                langue,
                nbParticipants,
                idCategorie,
                idContent,
            },
            Number(userId)
        );

        return res.status(201).json({
            message: "Formation créée avec succès",
            data: created,
        });
    } catch (e) {
        console.error("❌ Erreur createFormation :", e);
        next(e);
    }
};

// ---------------------------------------------------------
// UPDATE
// ---------------------------------------------------------
export const updateFormation = async (req, res, next) => {
    try {
        if (!req.session?.role || !["admin", "author"].includes(req.session.role)) {
            return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET missing in env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const id = Number(req.params.id);
        const updated = await Formation.updateOne(id, req.body);

        if (!updated)
            return res.status(404).json({ error: "Formation non trouvée" });

        return res.status(200).json(updated);
    } catch (e) {
        next(e);
    }
};

// ---------------------------------------------------------
// DELETE
// ---------------------------------------------------------
export const deleteFormation = async (req, res, next) => {
    try {
        if (!req.session?.role || !["admin", "author"].includes(req.session.role)) {
            return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET missing in env");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const ok = await Formation.deleteOne(Number(req.params.id));

        if (!ok)
            return res.status(404).json({ error: "Formation non trouvée" });

        return res.status(204).send();
    } catch (e) {
        next(e);
    }
};
