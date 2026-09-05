import request from "supertest";
import app from "../../src/app.js";

describe("Idempotency API", () => {

    let token;
    let productId;

    beforeAll(async () => {

        await request(app)
            .post("/auth/register")
            .send({
                name: "Idempotency User",
                email: "idem@test.com",
                password: "password123",
                role: "admin"
            });

        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "idem@test.com",
                password: "password123"
            });

        token = loginResponse.body.accessToken;

        const productResponse = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Idempotency Product",
                description: "Test Product",
                price: 100
            });

        productId = productResponse.body.id;

        await request(app)
            .patch(`/products/${productId}/inventory`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 100
            });
    });

    it("should return cached response for same idempotency key", async () => {

        const key = "order-123";

        const orderData = {
            items: [
                {
                    product_id: productId,
                    quantity: 1
                }
            ]
        };

        const firstResponse = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .set("Idempotency-Key", key)
            .send(orderData);

        const secondResponse = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .set("Idempotency-Key", key)
            .send(orderData);

        expect(firstResponse.status).toBe(201);

        expect(secondResponse.status).toBe(200);

        expect(secondResponse.body.id)
            .toBe(firstResponse.body.id);
    });

});