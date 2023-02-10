module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS users
            (
                id INT AUTO_INCREMENT,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE(email)
            );`,
    "down": "DROP TABLE users;"
};