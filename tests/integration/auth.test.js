import request from "supertest";
import { describe, test, expect } from "@jest/globals";

import app from "../../src/app.js";

describe("Auth API", () => {

    const userData = {
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "password123",
        role: "customer"
    };

    test("should register a new user", async () => {

        const response = await request(app)
            .post("/auth/register")
            .send(userData);

        expect(response.status).toBe(201);

        expect(response.body.message)
            .toBe("User registered successfully");

        expect(response.body.user.email)
            .toBe(userData.email);

    });

    test("should login successfully", async () => {

        const response = await request(app)
            .post("/auth/login")
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(response.status).toBe(200);

        expect(response.body.accessToken)
            .toBeDefined();

        expect(response.body.refreshToken)
            .toBeDefined();

    });

    test("should reject invalid password", async () => {

        const response = await request(app)
            .post("/auth/login")
            .send({
                email: userData.email,
                password: "wrongpassword"
            });

        expect(response.status).toBe(401);

    });

});