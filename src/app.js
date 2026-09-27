require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
    res.send("Welcome to DevTinder API Server!");
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const connectDb = require("./config/database");

connectDb()
    .then(() => {
        console.log("Database connection established");

        const PORT = process.env.PORT || 7777;

        app.listen(PORT, () => {
            console.log(`Server is successfully listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

module.exports = app;