CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL
        CHECK (
            status IN (
                'pending',
                'processing',
                'confirmed',
                'failed',
                'cancelled'
            )
        ),
    total NUMERIC(12,2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);