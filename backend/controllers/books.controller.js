import { Book } from '../models/bookModel.js';

// Post request - Provide input data
export const createBook = async (req, res, next) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ success: false, message: "Send all required fields: title, author, publishYear" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ success: false, message: 'Internal Server error' });
    }
}


// Get all books from database
export const getBooks = async(req, res, next) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ success: true, count: books.length, books});
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ success: false, message: 'Internal Server error' });
    }
}

// Get single book data
export const getSingleBook = async(req, res, next) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch(err) {
        console.log(`Error occured to fetch book \n ${err.message}`);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

// Update an exisiting book
export const editBook = async(req, res, next) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) 
            return res.status(400).send({ success:false, message: "Send all required fields: title, author, body" });
        
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result)
            return res.status(404).json({ success: false, message: "Book not found" });

        return res.status(200).send({ success: true, message: "Book updated successfully" });
    } catch(err) {
        console.log(`Error occured: ${err.message}`);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

// delete a book
export const deleteBook = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result)
            return res.status(404).json({ success: false, message: "Book not found" });

        return res.status(200).send({ success: true, message: "Book deleted successfully" });
    } catch(err) {
        console.log(`Error occured: ${err.message}`);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}