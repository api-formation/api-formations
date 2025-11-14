import mongoose from "mongoose";

const connectMongo = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/logs_db";

  try {
    await mongoose.connect(uri);
    console.log("✅ Connecté à MongoDB :", uri);
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB :", err);
    throw err;
  }
};

export default connectMongo;