require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            process.env.FRONTEND_URL?.replace(/\/$/, "")
        ].filter(Boolean),
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const connectDb = require("./config/database");

connectDb()
    .then(() => {
        console.log("Database connection established");
        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777");
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

module.exports = app;