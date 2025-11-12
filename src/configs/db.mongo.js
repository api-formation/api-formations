import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/api_formations", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connecté : ${conn.connection.name}`);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
    process.exit(1); 
  }
};
