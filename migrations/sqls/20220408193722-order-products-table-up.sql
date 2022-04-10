/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INTEGER,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
            REFERENCES orders(id),
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
            REFERENCES products(id)
);