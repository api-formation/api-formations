import { getPool } from '../configs/db.postgres.js';
export class User {
    #idUser;
    #prenom;
    #nom;
    #mdp;
    #age;
    #email;
    #idRole;

    constructor({ idUser, prenom, nom, mdp, age, email, idRole}) {
        this.#idUser = idUser;
        this.#prenom = prenom,
        this.#nom = nom,
        this.#mdp = mdp,
        this.#age = age,
        this.#email = email,
        this.#idRole = idRole
    }

    get idUser() {return this.#idUser};
    get prenom() {return this.#prenom};
    get idRole() {return this.#idRole};
    get nom() {return this.#nom}
    get mdp() {return this.#mdp};
    get age() {return this.#age}
    get email() {return this.#email}

    static async findAll() {
        try {
            const result = await getPool().query('SELECT * FROM users JOIN FormationsSuivies ON users.idUser = FormationsSuivies.idUser ORDER BY idUser ASC');
            return result.rows;
        } catch (error) {
            console.error('Erreur lors de la récupération des users:', error);

            if (error.code === '3D000' || error.message.includes('does not exist')) {
                const dbName = process.env.DB_NAME || 'users';
                throw new Error(`La base de données "${dbName}" n'existe pas. Veuillez la créer dans pgAdmin.`);
            }
            throw error;
        }
    }

    static async findById(idUser) {
        try {
            const result = await getPool().query('SELECT * FROM users u  JOIN formationssuivies fs ON u.idUser = fs.idUser WHERE u.idUser = $1', [idUser]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const result = await getPool().query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur par email:', error);
            throw error;
        }
    }

    static async create({prenom,nom,mdp,age,email,idRole}) {
        try {

            if (typeof prenom !== "string" || !prenom.trim()) {
                throw new Error("Title must be a non-empty string");
            }

            const result = await getPool().query(
                'INSERT INTO users (prenom,nom,mdp,age,email,idRole) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [prenom.trim(), nom, mdp, age, email, idRole]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la création de la formation:', error);
            throw error;
        }
    }


    static async updateOne(idUser, dto) {
        try {
      
            const existing = await this.findById(idUser);
            if (!existing) return null;


            const updates = [];
            const values = [];
            let paramIndex = 1;

            const validators = {
                prenom: v => typeof v === "string" && v.trim(),
                nom: v => typeof v === "string" && v.trim(),
                mdp: v => typeof v === "string" && v.trim(),
                email: v => typeof v === "string" && v.trim(),
                age: v => typeof v === "number" && v >= 0,
                idRole: v => typeof v === "number" && v > 0,
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

            values.push(idUser);

            const query = `UPDATE users SET ${updates.join(', ')} WHERE idUser = $${paramIndex} RETURNING *`;
            const result = await getPool().query(query, values);

            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la formation:', error);
            throw error;
        }
    }


    static async deleteOne(idUser) {
        try {
            const result = await getPool().query('DELETE FROM users WHERE idUser = $1 RETURNING idUser', [idUser]);
            return result.rowCount > 0; 
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
            throw error;
        }
    }
}
