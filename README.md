# **Projet API Formation**

## 🌟 **Description du projet**
Ce projet a été réalisé dans le cadre du module de développement backend (DEV3) afin de concevoir une API REST sécurisée
pour la gestion des formations. L’objectif est de fournir une architecture professionnelle intégrant Express.js, PostgreSQL,
MongoDB et les bonnes pratiques de sécurité.

---
### 📋 **Prérequis**
- Node.js
- PostgreSQL
- MongoDB
- Postman ou tout autre outil de test d'API
- Git
- npm

### 📋 **Installation**
1. Clonez le dépôt GitHub :
```bash
    git clone git@github.com:api-formation/api-formations.git
```

2. Instalation des dépendances :
```bash
    npm install
```

3. Configuration de la base de données :
   - Créez une base de données PostgreSQL et MongoDB.
   - Configurez les variables d'environnement dans un fichier `.env` à la racine du projet.
   - Il faudra juste changer les informations de connexion à vos bases de données (DB_USER, DB_PASSWORD).

4. Création des tables PostgreSQL :
```

CREATE TABLE roles (
    idRole SERIAL PRIMARY KEY,
    nom VARCHAR(255)
);

CREATE TABLE CATEGORIES (
    idCategorie SERIAL,
    nom VARCHAR(255)
);

CREATE TABLE formations (
    idFormation SERIAL,
    titre VARCHAR(255),
    description VARCHAR,
    prix int,
    duration int,
    dateMiseEnLigne DATE,
    langue VARCHAR(255),
    nbParticipants int,
    nbVideos int,
    idContent int,
    idCategorie int,
    PRIMARY KEY (idFormation)

);

CREATE TABLE users (
    idUser SERIAL,
    prenom VARCHAR(255),
    nom VARCHAR,
    email VARCHAR,
    mdp VARCHAR,
    age int,
    idFormationSuivies int,
    idRole int,
    PRIMARY KEY (idUser)
);

CREATE TABLE formationsSuivies (
    idFormationSuivies SERIAL PRIMARY KEY,
    dateDebut DATE NOT NULL,
    dateFin DATE,
    idUser INT NOT NULL,
    idFormation INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (idUser)
        REFERENCES users(iduser)
        ON DELETE CASCADE,
    CONSTRAINT fk_formation
        FOREIGN KEY (idFormation)
        REFERENCES formations(idformation)
        ON DELETE CASCADE
);
    
```
5. Pour préremplir la table des rôles, exécutez la commande suivante :
```bash
npm run role
```

6.Pour préremplir la table des catégories, exécutez la commande suivante :
```bash
npm run category
```
### 🚀 **Démarrage du serveur**
Pour démarrer le serveur, utilisez la commande suivante :
```bash
npm run dev
```
---
##  **Les collaborateurs**

Les personnes ayant travaillé sur le projet sont Nicolas Telega, Nathan Deroeck, et Noam Baroukh.