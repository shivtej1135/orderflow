import { describe, test, expect } from "@jest/globals";
import validateOrderItems from "../../src/utils/orderValidation.js";
import AppError from "../../src/utils/errors.js";

describe("Order Validation", () => {

    test("should throw error when items array is missing", () => {

        expect(() => {
            validateOrderItems();
        }).toThrow(AppError);

    });

    test("should throw error when items array is empty", () => {

        expect(() => {
            validateOrderItems([]);
        }).toThrow("Order items are required");

    });

    test("should throw error when quantity is zero", () => {

        expect(() => {
            validateOrderItems([
                {
                    product_id: 1,
                    quantity: 0
                }
            ]);
        }).toThrow("Quantity must be greater than zero");

    });

    test("should throw error when quantity is negative", () => {

        expect(() => {
            validateOrderItems([
                {
                    product_id: 1,
                    quantity: -5
                }
            ]);
        }).toThrow("Quantity must be greater than zero");

    });

    test("should not throw error for valid items", () => {

        expect(() => {
            validateOrderItems([
                {
                    product_id: 1,
                    quantity: 2
                }
            ]);
        }).not.toThrow();

    });

});