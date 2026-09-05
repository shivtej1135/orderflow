export default {
    testEnvironment: "node",

    testMatch: [
        "**/tests/**/*.test.js"
    ],

    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.js"
    ]
};

// testEnvironment: "node"
// We are testing backend APIs, not browser code

// testMatch
// Jest will automatically find files like:
// tests/unit/order.test.js
// tests/integration/auth.test.js
// tests/concurrency/orderConcurrency.test.js