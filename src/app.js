const express = require("express");
const cors = require("cors");

const app = express();
const router = express.Router();
const todoRoute = require("./routes/todo");

app.use(cors());
app.use("/api", todoRoute);

app.listen(3000);
