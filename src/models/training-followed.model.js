import {getPool} from '../configs/db.postgres.js';
export class Formation {
    #idFormationSuivies;
    #dateDebut;
    #dateFin;
    #idFormation;
    #idUser;

    constructor({idFormationSuivies, dateDebut, dateFin, idFormation, idUser}) {
        this.#idFormationSuivies = idFormationSuivies;
        this.#dateDebut = dateDebut;
        this.#dateFin = dateFin;
        this.#idFormation = idFormation;
        this.#idUser = idUser;
    }

    get idFormationSuivies() { return this.#idFormationSuivies; }
    get dateDebut() { return this.#dateDebut; }
    get dateFin() { return this.#dateFin; }
    get idFormation() { return this.#idFormation; }
    get idUser() { return this.#idUser; }

    static async findAllById(idUser) {
        const query = `
            SELECT fs.idformationsuivies,
                   fs.datedebut,
                   fs.datefin,
                   f.idformation,
                   f.titre,
                   f.description,
                   f.prix,
                   f.duration,
                   f.nbVideos,
                   f.dateMiseEnLigne,
                   f.langue,
                   f.nbParticipants,
                   f.idCategorie,
                   f.idContent
            FROM formationssuivies fs
                     JOIN formations f ON fs.idformation = f.idformation
            WHERE fs.iduser = $1
            ORDER BY fs.datedebut DESC
        `;
        const result = await getPool().query(query, [idUser]);
        return result.rows; // renvoie un tableau complet avec toutes les colonnes
    }



    static async findOneByUser(idUser, idFormation) {
        const query = `
            SELECT *
            FROM formationssuivies
            WHERE iduser = $1 AND idformation = $2
            LIMIT 1
        `;
        const result = await getPool().query(query, [idUser, idFormation]);
        return result.rows[0] || null;
    }
    static async create(idUser, idFormation) {
        // Vérifie si l'utilisateur suit déjà cette formation
        const check = await getPool().query(
            'SELECT * FROM formationssuivies WHERE iduser = $1 AND idformation = $2',
            [idUser, idFormation]
        );
        if (check.rows.length > 0) {
            throw new Error("L'utilisateur suit déjà cette formation");
        }

        // Sinon, on crée l'entrée
        const query = `
        INSERT INTO formationssuivies (datedebut, idformation, iduser)
        VALUES (NOW(), $2, $1)
        RETURNING *;
    `;
        const result = await getPool().query(query, [idUser, idFormation]);
        return result.rows[0];
    }


    static async deleteOneByUser(idUser, idFormation) {
        const result = await getPool().query(
            'DELETE FROM formationssuivies WHERE iduser = $1 AND idformation = $2 RETURNING *',
            [idUser, idFormation]
        );
        return result.rows[0] || null;
    }
}
