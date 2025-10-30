import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongooseConnect from './src/database/connection.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', (req, res) => {
  res.send("hello")
});

mongooseConnect()
.then(() => {
  console.log("Mongoose database connected")
})
.then(() => {
  app.listen(port, () => {
    console.log("app listing on port: 3000");
  })
})