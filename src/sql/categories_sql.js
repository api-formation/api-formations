import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function seedCategories() {
    const categories = [
        { idcategorie: 1, nom: "Informatique" },
        { idcategorie: 2, nom: "Business" },
        { idcategorie: 3, nom: "Science" },
        { idcategorie: 4, nom: "Arts" },
        { idcategorie: 5, nom: "Langues" },
        { idcategorie: 6, nom: "Développement personnel" },
    ];

    for (const categorie of categories) {
        await pool.query(
            `INSERT INTO categories (idcategorie, nom)
       VALUES ($1, $2)
       ON CONFLICT (idcategorie) DO NOTHING`,
            [categorie.idcategorie, categorie.nom]
        );
    }

    console.log("✅ Categories par défaut insérés avec succès.");
    await pool.end();
}

seedCategories().catch(console.error);
