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
            SELECT idformation
            FROM formationssuivies
            WHERE iduser = $1
            ORDER BY datedebut DESC
        `;
        const result = await getPool().query(query, [idUser]);
        return result.rows;
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

    static async deleteOneByUser(idUser, idFormation) {
        const result = await getPool().query(
            'DELETE FROM formationssuivies WHERE iduser = $1 AND idformation = $2 RETURNING *',
            [idUser, idFormation]
        );
        return result.rows[0] || null;
    }
}
