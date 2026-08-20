CREATE INDEX IF NOT EXISTS idx_orders_user_id
ON orders(user_id);



CREATE INDEX IF NOT EXISTS idx_order_items_product_id
ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id
ON refresh_tokens(user_id);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at
ON refresh_tokens(expires_at);