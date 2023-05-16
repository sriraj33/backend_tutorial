import { app } from "./app.js";
// import express from "express";
import { connectDB } from "./data/database.js";

connectDB()

// app.use(express.json());

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on Port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
});