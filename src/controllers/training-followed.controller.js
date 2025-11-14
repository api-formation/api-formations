import { Formation } from "../models/training-followed.model.js";

export const findAllById = async (req, res, next) => {
    try {
        const idUser = Number(req.params.idUser);
        // Récupère toutes les formations suivies par l'utilisateur (avec toutes les infos)
        const data = await Formation.findAllById(idUser);

        // On renvoie directement le tableau complet
        return res.status(200).json({ total: data.length, data });
    } catch (e) {
        next(e);
    }
};



// Récupère une seule formation suivie par l’utilisateur
export const findOneByUser = async (req, res, next) => {
    try {
        const idUser = Number(req.params.idUser);
        const idFormation = Number(req.params.idFormation);

        const formation = await Formation.findOneByUser(idUser, idFormation);
        if (!formation) return res.status(404).json({ error: "Formation non trouvée" });

        return res.status(200).json(formation);
    } catch (e) {
        next(e);
    }
};

export const createFormationForUser = async (req, res, next) => {
    try {
        const idUser = Number(req.params.idUser);
        const idFormation = Number(req.params.idFormation);

        const formation = await Formation.create(idUser, idFormation);
        return res.status(201).json(formation);
    } catch (e) {
        next(e);
    }
};


// Supprime une formation suivie par l’utilisateur
export const deleteOneByUser = async (req, res, next) => {
    try {
        const idUser = Number(req.params.idUser);
        const idFormation = Number(req.params.idFormation);

        const deleted = await Formation.deleteOneByUser(idUser, idFormation);
        if (!deleted) return res.status(404).json({ error: "Formation non trouvée" });

        return res.status(204).send();
    } catch (e) {
        next(e);
    }
};
