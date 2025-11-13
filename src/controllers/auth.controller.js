import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "2h";

export async function register(req, res, next) {
  try {
    const { prenom, email, nom, mdp, age, idFormationSuivies} = req.body;
    if (!prenom || !email || !mdp || !nom || !age) return res.status(422).json({ message: "prenom, nom, email, age and mdp required" });

    const existing = await User.findByEmail(String(email).trim());
    if (existing) return res.status(409).json({ message: "Email already used" });

    const hash = await bcrypt.hash(mdp, SALT_ROUNDS);
    const user = await User.create({ prenom, email, nom, mdp: hash, age, idFormationSuivies, idRole:3 });

    const safe = { id: user._id, email: user.email, name: user.name, createdAt: user.createdAt };
    res.status(201).json(safe);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, mdp } = req.body;
    if (!email || !mdp) return res.status(422).json({ message: "email and password required" });

     const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invaliddd credentials" });

    const ok = await bcrypt.compare(mdp, user.mdp);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });


    if (!JWT_SECRET) {
      console.error("JWT_SECRET missing in env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({ accessToken: token, expiresIn: JWT_EXPIRES });
  } catch (err) {
    next(err);
  }
}
