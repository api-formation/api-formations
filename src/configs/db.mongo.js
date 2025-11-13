// mongo.js
const mongoose = require('mongoose');

async function connectMongo() {
  const uri = process.env.MONGO_URI 

  await mongoose.connect(uri, {
  
  });

  console.log('Connecté à MongoDB pour les logs');
}

module.exports = connectMongo;