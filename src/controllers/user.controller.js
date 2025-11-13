import { User } from "../models/user.model.js";

export const listUsers = async (req, res, next) => {
  try {
    const { q, limit = 50, offset = 0 } = req.query;
    let data = await User.findAll();

    if (q) {
      data = data.filter((User) =>
        User.title.toLowerCase().includes(String(q).toLowerCase())
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

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User non trouvé" });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { prenom,nom,mdp,age,email,idRole } = req.body;
    if ( prenom  === undefined) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont requis" });
    }
    const created = await User.createOne({ 
      prenom,nom,mdp,age,email,idRole
    });
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await User.updateOne(Number(req.params.id), req.body);
    if (!updated)
      return res.status(404).json({ error: "User non trouvé" });
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const ok = await User.deleteOne(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "User non trouvé" });
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};