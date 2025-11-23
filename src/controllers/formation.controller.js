import {Formation} from "../models/formation.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const listFormations = async (req, res, next) => {
  try {
    const { q, limit = 50, offset = 0 } = req.query;
    let data = await Formation.findAll();

    if (q) {
      data = data.filter((Formation) =>
        Formation.title.toLowerCase().includes(String(q).toLowerCase())
      );
    }
    
    const start = Number(offset),
      end = start + Number(limit);
    return res
      .status(200)
      .json({ total: data.length, data: data.slice(start, end) });
  } catch (e) {
    next(e);
  }
};

export const getFormation = async (req, res, next) => {
  try {
    const formation = await Formation.findById(Number(req.params.id));
    if (!formation) return res.status(404).json({ error: "Formation non trouvé" });
    return res.status(200).json(formation);
  } catch (e) {
    next(e);
  }
};

export const createFormation = async (req, res, next) => {
  try {

      if (!req.session || (req.session.role !== "admin" && req.session.role !== "author")) {
          return res.status(403).json({error: "Erreur de role"});
      }
    const { titre,prix,description,duration,nbVideos,dateMiseEnLigne,langue,nbParticipants,idCategorie,idContent } = req.body;
    if ( titre  === undefined) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont requis" });
    }
    const userId = req.user?.idUser || req.user?.id || req.body.idUser;
    if (!userId) {
      return res.status(400).json({
        error:
          "userId est requis pour créer une formation (nécessaire pour le log Mongo).",
      });
    }
    const created = await Formation.createOne(
      { titre,prix,description,duration,nbVideos,dateMiseEnLigne,langue,nbParticipants,idCategorie,idContent }, Number(userId));
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export const updateFormation = async (req, res, next) => {
  try {
      if (!req.session || (req.session.role !== "admin" && req.session.role !== "author")) {
          return res.status(403).json({error: "Erreur de role"});
      }
      const updated = await Formation.updateOne(Number(req.params.id), req.body);
    if (!updated)
        return res.status(404).json({error: "Formation non trouvé"});
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

export const deleteFormation = async (req, res, next) => {
  try {
      if (!req.session || (req.session.role !== "admin" && req.session.role !== "author")) {
          return res.status(403).json({error: "Erreur de role"});
      }
    const ok = await Formation.deleteOne(Number(req.params.id));
      if (!ok) return res.status(404).json({error: "Formation non trouvé"});
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};