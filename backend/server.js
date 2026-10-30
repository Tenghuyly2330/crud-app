const express = require("express");
const cors = require("cors");
require("dotenv").config();
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);

app.get('/health', (req, res) => {
    res.json({ message: "OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
 