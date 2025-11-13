// src/models/formationLog.model.js
import mongoose from "mongoose";

const formationLogSchema = new mongoose.Schema(
  {
    formationId: { type: Number, required: true }, // id Postgres de la formation
    userId: { type: Number, required: true },      // id Postgres du user
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      default: "CREATE",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },  // date du log
  },
  {
    collection: "formation_logs",
  }
);

const FormationLog = mongoose.model("FormationLog", formationLogSchema);

export default FormationLog;