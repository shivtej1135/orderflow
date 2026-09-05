import { describe, test, expect } from "@jest/globals";
import calculateOrderTotal from "../../src/utils/orderCalculation.js";

describe("Order Calculation", () => {

    test("should calculate total for a single product", () => {

        const products = [
            {
                id: 1,
                price: 100
            }
        ];

        const items = [
            {
                product_id: 1,
                quantity: 2
            }
        ];

        expect(
            calculateOrderTotal(products, items)
        ).toBe(200);

    });

    test("should calculate total for multiple products", () => {

        const products = [
            {
                id: 1,
                price: 100
            },
            {
                id: 2,
                price: 50
            }
        ];

        const items = [
            {
                product_id: 1,
                quantity: 2
            },
            {
                product_id: 2,
                quantity: 3
            }
        ];

        expect(
            calculateOrderTotal(products, items)
        ).toBe(350);

    });

    test("should handle decimal prices", () => {

        const products = [
            {
                id: 1,
                price: 99.99
            }
        ];

        const items = [
            {
                product_id: 1,
                quantity: 2
            }
        ];

        expect(
            calculateOrderTotal(products, items)
        ).toBeCloseTo(199.98);

    });

    test("should return zero for empty items", () => {

        expect(
            calculateOrderTotal([], [])
        ).toBe(0);

    });

    test("should calculate large quantities correctly", () => {

        const products = [
            {
                id: 1,
                price: 100
            }
        ];

        const items = [
            {
                product_id: 1,
                quantity: 100
            }
        ];

        expect(
            calculateOrderTotal(products, items)
        ).toBe(10000);

    });

});

// toBe()
// Exact match

// toBeCloseTo()
// Used for floating-point calculations

// These tests verify business logic
// without PostgreSQL, Redis, BullMQ,
// Express, or Socket.IO.