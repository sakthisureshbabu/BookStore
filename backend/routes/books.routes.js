import express from "express";
import { Book } from '../models/bookModel.js';
import { createBook, getBooks, getSingleBook, editBook, deleteBook } from "../controllers/books.controller.js";

const router = express.Router();

//Provide input to the database
router.post('/', createBook);


//get all books from database
router.get('/', getBooks);


//get a single book info using id
router.get('/:id', getSingleBook);

//update a book
router.put('/:id', editBook);

// Delete a book
router.delete('/:id', deleteBook);

export default router;