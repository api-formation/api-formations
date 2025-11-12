import { getPool } from '../configs/db.postgres.js';
export class Formation {
    #idFormation;
    #titre;
    #prix;
    #description;
    #duration;
    #nbVideos;
    #dateMiseEnLigne;
    #langue;
    #nbParticipants;
    #idCategorie;
    #idContent;

    constructor({ idFormation, titre, prix, description, duration, dateMiseEnLigne, langue, nbParticipants,idCategorie, idContent}) {
        this.#idFormation = idFormation;
        this.#titre = titre,
        this.#prix = prix,
        this.#description = description,
        this.#duration = duration,
        this.#nbVideos = nbVideos,
        this.#dateMiseEnLigne = dateMiseEnLigne,
        this.#langue = langue,
        this.#nbParticipants = nbParticipants,
        this.#idCategorie = idCategorie,
        this.#idContent = idContent
    }

    get idFormation() {return this.#idFormation};
    get titre() {return this.#titre};
    get idCategorie() {return this.#idCategorie};
    get idContent() {return this.#idContent};
    get prix() {return this.#prix};
    get description() {return this.#description}
    get duration() {return this.#duration};
    get nbVideos() {return this.#nbVideos}
    get dateMiseEnLigne() {return this.#dateMiseEnLigne};
    get langue() {return this.#langue}
    get nbParticipants() {return this.#nbParticipants};

    static async findAll() {
        try {
            const result = await getPool().query('SELECT * FROM formations ORDER BY idFormation ASC');
            return result.rows;
        } catch (error) {
            console.error('Erreur lors de la récupération des formations:', error);

            if (error.code === '3D000' || error.message.includes('does not exist')) {
                const dbName = process.env.DB_NAME || 'formations';
                throw new Error(`La base de données "${dbName}" n'existe pas. Veuillez la créer dans pgAdmin.`);
            }
            throw error;
        }
    }

    static async findById(idFormation) {
        try {
            const result = await getPool().query('SELECT * FROM formations WHERE idFormation = $1', [idFormation]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Erreur lors de la récupération de la formation:', error);
            throw error;
        }
    }


    static async createOne({titre,prix,description,duration,nbVideos,dateMiseEnLigne,langue,nbParticipants,idCategorie,idContent}) {
        try {

            if (typeof titre !== "string" || !titre.trim()) {
                throw new Error("Title must be a non-empty string");
            }

            const result = await getPool().query(
                'INSERT INTO formations (titre,prix,description,duration,nbVideos,dateMiseEnLigne,langue,nbParticipants,idCategorie,idContent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [titre.trim(), prix, description, duration, nbVideos, dateMiseEnLigne, langue, nbParticipants, idCategorie, idContent]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la création de la formation:', error);
            throw error;
        }
    }


    static async updateOne(idFormation, dto) {
        try {
      
            const existing = await this.findById(idFormation);
            if (!existing) return null;


            const updates = [];
            const values = [];
            let paramIndex = 1;

            const validators = {
                titre: v => typeof v === "string" && v.trim(),
                description: v => typeof v === "string" && v.trim(),
                prix: v => typeof v === "number" && v >= 0,
                duration: v => typeof v === "number" && v > 0,
                dateMiseEnLigne: v => !isNaN(new Date(v).getTime()),
                langue: v => typeof v === "string" && v.trim(),
                nbParticipants: v => typeof v === "number" && v >= 0,
                nbVideos: v => typeof v === "number" && v >= 0,
                idCategorie: v => typeof v === "number" && v > 0,
                idContent: v => typeof v === "number" && v > 0,
            };

            for (const [key, validate] of Object.entries(validators)) {
                if (dto[key] !== undefined) {
                    if (!validate(dto[key])) {
                        throw new Error(`Invalid ${key}`);
                    }

                    let value = dto[key];
                    if (typeof value === "string") value = value.trim();
                    if (key === "dateMiseEnLigne") value = new Date(value);

                    updates.push(`${key} = $${paramIndex++}`);
                    values.push(value);
                }
            }


            if (updates.length === 0) {
                return existing; 
            }

            values.push(idFormation);

            const query = `UPDATE formations SET ${updates.join(', ')} WHERE idFormation = $${paramIndex} RETURNING *`;
            const result = await getPool().query(query, values);

            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la formation:', error);
            throw error;
        }
    }


    static async deleteOne(idFormation) {
        try {
            const result = await getPool().query('DELETE FROM formations WHERE idFormation = $1 RETURNING idFormation', [idFormation]);
            return result.rowCount > 0; 
        } catch (error) {
            console.error('Erreur lors de la suppression de la formation', error);
            throw error;
        }
    }
}
