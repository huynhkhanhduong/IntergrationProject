const connection = require("../config/database");

const getAllUsers = async (req, res) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        let [results, fields] = await connection.query("select * from Users u");
        return results;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const handleCreateUser = async ({ email, name, address }) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        await connection.query(
            `INSERT INTO Users (email, name, City)
            VALUES (?, ?, ?);`,
            [email, name, address]
        );
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const getEditUser = async (id) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        let results = await connection.query(
            `SELECT * FROM Users WHERE id = ` + id
        );
        return results;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const handleUpdateUser = async (updateUser) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        const query = `
            UPDATE Users
            SET name = ?, email = ?, City= ? 
            WHERE id = ?`;
        await connection.query(query, [
            updateUser.name,
            updateUser.email,
            updateUser.address,
            updateUser.id,
        ]);
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

const getDeleteUser = async (id) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        await connection.query("DELETE FROM Users WHERE id = " + id);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

module.exports = {
    getAllUsers,
    handleCreateUser,
    getEditUser,
    getDeleteUser,
    handleUpdateUser,
};
