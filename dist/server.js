"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./api/app");
const db_1 = require("./config/db");
const PORT = (process.env.PORT || 5000);
app_1.app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    (0, db_1.connectDB)();
});
