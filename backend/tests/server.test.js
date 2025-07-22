const request = require("supertest");
const app = require("../server");

describe("Server Health Check", () => {
  test("GET /health should return 200", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
  });
});

describe("AI API Endpoints", () => {
  test("POST /api/ai/process should validate input", async () => {
    const response = await request(app)
      .post("/api/ai/process")
      .send({
        code: "",
        task: "invalid",
      })
      .expect(400);

    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("errors");
  });

  test("POST /api/ai/process should require code", async () => {
    const response = await request(app)
      .post("/api/ai/process")
      .send({
        task: "explain",
      })
      .expect(400);

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Code is required",
        }),
      ])
    );
  });

  test("POST /api/ai/process should validate task type", async () => {
    const response = await request(app)
      .post("/api/ai/process")
      .send({
        code: 'console.log("test");',
        task: "invalid_task",
      })
      .expect(400);

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Task must be one of: explain, debug, translate",
        }),
      ])
    );
  });

  test("GET /api/ai/test should check AI service", async () => {
    const response = await request(app).get("/api/ai/test");

    // Should either succeed or fail gracefully
    expect([200, 500]).toContain(response.status);
    expect(response.body).toHaveProperty("success");
  });
});
