// src/middleware/error.middleware.js  (DEBUG — temporaire)
export function errorHandler(err, req, res, next) {
  // log complet côté serveur (console)
  console.error("ERROR HANDLER CAUGHT:", err && (err.stack || err));

  // renvoyer la stack dans la réponse pour tests (à enlever en prod)
  res.status(err?.status || 500).json({
    message: err?.message || "Internal server error",
    stack: err?.stack || null
  });
};