/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    status_of_order VARCHAR(20),
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
);