require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { model } = require("./models/users");
const cors = require('cors');
const PORT = 5000;


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/", usersRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
