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

CREATE TABLE roles (
    idRole SERIAL,
    nom VARCHAR(255),
    PRIMARY KEY (idRole)
);
    
```
5. Pour préremplir la table des rôles, exécutez la commande suivante :
```bash
npm run role
```

---
##  **Les collaborateurs**

Les personnes ayant travaillé sur le projet sont Nicolas Telega, Nathan Deroeck, et Noam Baroukh.