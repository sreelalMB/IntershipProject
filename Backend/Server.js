const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const route = require("./Router");
const db = require("./Dbconnection");

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", route);

// Server setup
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
