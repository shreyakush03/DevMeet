require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database");

const PORT = process.env.PORT || 7777;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });