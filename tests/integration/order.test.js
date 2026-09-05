import request from "supertest";
import app from "../../src/app.js";

describe("Order API", () => {

    let adminToken;
    let customerToken;
    let productId;

    beforeAll(async () => {

        // Register admin
        await request(app)
            .post("/auth/register")
            .send({
                name: "Admin User",
                email: "admin@test.com",
                password: "password123",
                role: "admin"
            });

        // Login admin
        const adminLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "admin@test.com",
                password: "password123"
            });

        adminToken = adminLogin.body.accessToken;

        // Create product
        const productResponse = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                name: "Test Product",
                description: "Test Description",
                price: 100
            });

        productId = productResponse.body.id;

        // Add inventory
        await request(app)
            .patch(`/products/${productId}/inventory`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                quantity: 10
            });

        // Register customer
        await request(app)
            .post("/auth/register")
            .send({
                name: "Customer User",
                email: "customer@test.com",
                password: "password123",
                role: "customer"
            });

        // Login customer
        const customerLogin = await request(app)
            .post("/auth/login")
            .send({
                email: "customer@test.com",
                password: "password123"
            });

        customerToken =
            customerLogin.body.accessToken;
    });

    test("should create order successfully", async () => {

        const response = await request(app)
            .post("/orders")
            .set(
                "Authorization",
                `Bearer ${customerToken}`
            )
            .set(
    "Idempotency-Key",
    `order-test-${Date.now()}`
)
            .send({
                items: [
                    {
                        product_id: productId,
                        quantity: 2
                    }
                ]
            });

        expect(response.status).toBe(201);

        expect(response.body.id)
            .toBeDefined();

    });

});