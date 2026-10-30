const db = require("../config/db");

exports.createItem = async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await db.query("INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *", [title, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAllItems = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM items WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await db.query("UPDATE items SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}