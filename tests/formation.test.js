
import { jest } from "@jest/globals";
import request from "supertest";
import session from "supertest-session";

let app;
let testSession;

beforeAll(async () => {
  await jest.unstable_mockModule("../src/models/formation.model.js", () => {
    const Formation = {
      findAll: async () => [{ idFormation: 1, titre: "Formation existante" }],
      findById: async (id) => ({ idFormation: Number(id), titre: "Formation existante" }),
      createOne: async (payload) => ({ idFormation: 2, ...payload }),
      updateOne: async (id, payload) => ({ idFormation: Number(id), ...payload }),
      deleteOne: async (id) => true,
    };
    return { Formation };
  });


  const module = await import("../src/app.js");
  app = module.default;

  app.use((req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      req.session = {
        role: "admin",
        touch: () => {},
        save: (cb) => cb && cb(),
        destroy: (cb) => cb && cb(),
      };
    }
    next();
  });
  testSession = session(app);
});

describe("Formation API (mocked)", () => {

  test("POST /api/formations => 201", async () => {
    const payload = { titre: "Test Post Formation", prix: 50 };
    const res = await request(app).post("/api/formations").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.titre).toBe(payload.titre);
    expect(res.body.idFormation).toBe(2);
  });

  test("GET /api/formations => 200", async () => {
    const res = await request(app).get("/api/formations");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual([{ idFormation: 1, titre: "Formation existante" }]);
  });

  test("GET /api/formations/:id => 200", async () => {
    const res = await request(app).get("/api/formations/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ idFormation: 1, titre: "Formation existante" });
  });

  test("PUT /api/formations/:id => 200", async () => {
    const payload = { titre: "Test Put Formation", prix: 50 };
    const res = await request(app).put("/api/formations/1").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.titre).toBe(payload.titre);
    expect(res.body.idFormation).toBe(1);
  });

    test("DELETE /api/formations/:id => 204", async () => {
    const res = await request(app)
        .delete("/api/formations/1")
        .set("Accept", "application/json"); 
    expect(res.status).toBe(204);
    });


});
