// src/controllers/formation.controller.js

import { Formation } from "../models/formation.model.js";
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "2h";

export const listFormations = async (req, res, next) => {
   if (!JWT_SECRET) {
        console.error("JWT_SECRET missing in env");
        return res.status(500).json({ message: "Server misconfiguration" });
    }
  try {
     
    const { q, limit = 50, offset = 0 } = req.query;
    let data = await Formation.findAll();

    if (q) {
      const query = String(q).toLowerCase();
      data = data.filter((formation) =>
        String(formation.titre).toLowerCase().includes(query)
      );
    }

    const start = Number(offset);
    const end = start + Number(limit);
    return res
      .status(200)
      .json({ total: data.length, data: data.slice(start, end) });
  } catch (e) {
    next(e);
  }
};

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

export const createFormation = async (req, res, next) => {
  try {
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
      if (!JWT_SECRET) {
        console.error("JWT_SECRET missing in env");
        return res.status(500).json({ message: "Server misconfiguration" });
    }
    const { titre,prix,description,duration,nbVideos,dateMiseEnLigne,langue,nbParticipants,idCategorie,idContent } = req.body;
    if ( titre  === undefined) {
      return res
        .status(400)
        .json({ error: "Titre et description sont obligatoires" });
    }

    // 🧍‍♂️ ID de l'utilisateur qui crée la formation
    // (adapte selon ton système d'authentification)
    const userId =
      req.user?.idUser || req.user?.id || req.body.idUser;

    if (!userId) {
      return res
        .status(400)
        .json({
          error:
            "userId est requis pour créer une formation (nécessaire pour le log Mongo).",
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

export const updateFormation = async (req, res, next) => {
  try {
      if (!JWT_SECRET) {
        console.error("JWT_SECRET missing in env");
        return res.status(500).json({ message: "Server misconfiguration" });
    }
    const updated = await Formation.updateOne(Number(req.params.id), req.body);
    if (!updated) {
      return res.status(404).json({ error: "Formation non trouvée" });
    }
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

export const deleteFormation = async (req, res, next) => {
  try {
      if (!JWT_SECRET) {
        console.error("JWT_SECRET missing in env");
        return res.status(500).json({ message: "Server misconfiguration" });
    }
    const ok = await Formation.deleteOne(Number(req.params.id));
    if (!ok) {
      return res.status(404).json({ error: "Formation non trouvée" });
    }
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};