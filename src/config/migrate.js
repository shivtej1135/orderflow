import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(__dirname, "../../migrations");

const runMigrations = async () => {
    const client = await pool.connect();

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) UNIQUE NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const files = await fs.readdir(migrationsPath);

        const migrations = files
            .filter((file) => file.endsWith(".sql"))
            .sort();

        for (const migration of migrations) {
            const result = await client.query(
                "SELECT 1 FROM schema_migrations WHERE filename = $1",
                [migration]
            );

            if (result.rowCount > 0) {
                continue;
            }

            const sql = await fs.readFile(
                path.join(migrationsPath, migration),
                "utf-8"
            );

            await client.query("BEGIN");

            try {
                await client.query(sql);

                await client.query(
                    "INSERT INTO schema_migrations (filename) VALUES ($1)",
                    [migration]
                );

                await client.query("COMMIT");

                console.log(`Migration applied: ${migration}`);
            } catch (error) {
                await client.query("ROLLBACK");
                throw error;
            }
        }

        console.log("All migrations completed successfully.");
    } finally {
        client.release();
        await pool.end();
    }
};

runMigrations().catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
});