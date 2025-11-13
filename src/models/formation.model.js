// src/models/formation.model.js
import { getPool } from "../configs/db.postgres.js";
import FormationLog from "./formationLog.model.js";

export class Formation {
  // -----------------------------
  //   MAPPING
  // -----------------------------
  static #fromRow(row) {
    if (!row) return null;

    return {
      idFormation: row.idformation,
      titre: row.titre,
      prix: row.prix,
      description: row.description,
      duration: row.duration,
      nbVideos: row.nbvideos,
      dateMiseEnLigne: row.datemiseenligne,
      langue: row.langue,
      nbParticipants: row.nbparticipants,
      idCategorie: row.idcategorie,
      idContent: row.idcontent,
    };
  }

 
  static async findAll() {
    try {
      const result = await getPool().query(
        "SELECT * FROM formations ORDER BY idformation ASC;"
      );
      return result.rows.map((row) => Formation.#fromRow(row));
    } catch (err) {
      console.error("Erreur findAll:", err);
      throw err;
    }
  }

  
  static async findById(id) {
    try {
      const result = await getPool().query(
        "SELECT * FROM formations WHERE idformation = $1",
        [id]
      );
      return Formation.#fromRow(result.rows[0]);
    } catch (err) {
      console.error("Erreur findById:", err);
      throw err;
    }
  }

  
  static async createOne(data, userId) {
    try {
      if (typeof data.titre !== "string" || !data.titre.trim()) {
        throw new Error("Le titre doit être une chaîne non vide");
      }

      if (!userId) {
        throw new Error("userId est obligatoire pour créer un log Mongo");
      }

      const pool = getPool();

      // 1) Création dans PostgreSQL
      const result = await pool.query(
        `INSERT INTO formations
        (titre, prix, description, duration, nbVideos, dateMiseEnLigne, langue, nbParticipants, idCategorie, idContent) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *`,
        [
          data.titre.trim(),
          data.prix,
          data.description,
          data.duration,
          data.nbVideos,
          data.dateMiseEnLigne,
          data.langue,
          data.nbParticipants,
          data.idCategorie,
          data.idContent,
        ]
      );

      const row = result.rows[0];
      console.log("🎓 Formation créée (Postgres):", row);

      const formationId = row.idformation; // <-- IMPORTANT : minuscule

      if (!formationId) {
        throw new Error(
          "Impossible de récupérer idformation pour le log Mongo"
        );
      }

      // 2) LOG dans MongoDB
      await FormationLog.create({
        formationId,
        userId: Number(userId),
        action: "CREATE",
      });

      // 3) On renvoie la formation mappée
      return Formation.#fromRow(row);
    } catch (err) {
      console.error("Erreur createOne (Postgres + log Mongo):", err);
      throw err;
    }
  }

  
  static async updateOne(idFormation, data) {
    try {
      const result = await getPool().query(
        `UPDATE formations SET 
          titre = $1,
          prix = $2,
          description = $3,
          duration = $4,
          nbVideos = $5,
          dateMiseEnLigne = $6,
          langue = $7,
          nbParticipants = $8,
          idCategorie = $9,
          idContent = $10
        WHERE idformation = $11
        RETURNING *`,
        [
          data.titre,
          data.prix,
          data.description,
          data.duration,
          data.nbVideos,
          data.dateMiseEnLigne,
          data.langue,
          data.nbParticipants,
          data.idCategorie,
          data.idContent,
          idFormation,
        ]
      );

      return Formation.#fromRow(result.rows[0]);
    } catch (err) {
      console.error("Erreur updateOne:", err);
      throw err;
    }
  }

 
  static async deleteOne(idFormation) {
    try {
      const result = await getPool().query(
        "DELETE FROM formations WHERE idformation = $1 RETURNING idformation",
        [idFormation]
      );

      return result.rowCount > 0;
    } catch (err) {
      console.error("Erreur deleteOne:", err);
      throw err;
    }
  }
}

export default Formation;