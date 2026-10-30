const express = require("express");
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require("../controllers/itemController");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;