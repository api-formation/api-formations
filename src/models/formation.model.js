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

    // -----------------------------
    //   FIND ALL
    // -----------------------------
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

    // -----------------------------
    //   FIND BY ID
    // -----------------------------
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

    // -----------------------------
    //   CREATE
    // -----------------------------
    static async createOne(data, userId) {
        try {
            if (typeof data.titre !== "string" || !data.titre.trim()) {
                throw new Error("Le titre doit être une chaîne non vide");
            }

            if (!userId) {
                throw new Error("userId est obligatoire pour créer un log Mongo");
            }

            const pool = getPool();

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
            const formationId = row.idformation;

            await FormationLog.create({
                formationId,
                userId: Number(userId),
                action: "CREATE",
            });

            return Formation.#fromRow(row);
        } catch (err) {
            console.error("Erreur createOne (Postgres + log Mongo):", err);
            throw err;
        }
    }

    // -----------------------------
    //   FIND ALL (avec JOIN)
    // -----------------------------
    static async findAllWithCategory() {
        try {
            const result = await getPool().query(
                "SELECT * FROM formations JOIN Categories ON formations.idCategorie = Categories.idCategorie ORDER BY idFormation ASC"
            );
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération des formations:", error);

            if (error.code === "3D000" || error.message.includes("does not exist")) {
                const dbName = process.env.DB_NAME || "formations";
                throw new Error(`La base de données "${dbName}" n'existe pas. Veuillez la créer dans pgAdmin.`);
            }
            throw error;
        }
    }

    // -----------------------------
    //   FIND BY ID (avec JOIN)
    // -----------------------------
    static async findByIdWithCategory(idFormation) {
        try {
            const result = await getPool().query(
                "SELECT * FROM formations JOIN Categories ON formations.idCategorie = Categories.idCategorie WHERE idFormation = $1",
                [idFormation]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Erreur lors de la récupération de la formation:", error);
            throw error;
        }
    }

    // -----------------------------
    //   UPDATE
    // -----------------------------
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

    // -----------------------------
    //   DELETE
    // -----------------------------
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
