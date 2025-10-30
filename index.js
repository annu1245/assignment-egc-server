import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongooseConnect from "./src/database/connection.js";
import transactionRouter from "./src/routes/transaction.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRouter);

mongooseConnect()
    .then(() => {
        console.log("Mongoose database connected");
    })
    .then(() => {
        app.listen(port, () => {
            console.log("app listing on port: 3000");
        });
    });
