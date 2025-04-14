import express from "express";
import dotenv from "dotenv";
import { DBConnect } from "./config/db.js";
import booksRoute from './routes/books.routes.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const mongourl = process.env.MONGO_URI;

const app = express();

// Middleware to parse the request body;
app.use(express.json());
app.use(cors());
// app.use(cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeader: ['Content-Type']
//     })
// );

app.get("/", async (req, res, next) => {
    res.send("On Bookstore App");
});

app.use('/books', booksRoute);

DBConnect(mongourl, () => {
    app.listen(port, () => {       
        console.log(`Server is running on port ${port}`);
    });
})