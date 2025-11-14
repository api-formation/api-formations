import { connectMongoDB } from "./configs/db.mongo.js";
import { connectPostgreSQL } from "./configs/db.postgres.js";
import app from "./app.js";

(async function start(){
  try {
  await connectMongoDB();
  await connectPostgreSQL();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>console.log(` Server running on http://localhost:${PORT}/`));
  }catch (err){
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})()
