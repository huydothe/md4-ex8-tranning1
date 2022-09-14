"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_model_1 = require("../schemas/book.model");
const multer_1 = __importDefault(require("multer"));
const author_model_1 = require("../schemas/author.model");
const bookRouters = (0, express_1.Router)();
const upload = (0, multer_1.default)();
bookRouters.get('/create', (req, res) => {
    res.render('createBook');
});
bookRouters.post('/create', upload.none(), async (req, res) => {
    try {
        const authorNew = new author_model_1.Author({
            name: req.body.author
        });
        const bookNew = new book_model_1.Book({
            title: req.body.title,
            description: req.body.description,
            author: authorNew
        });
        bookNew.keywords.push({ keywords: req.body.keywords });
        const p1 = bookNew.save();
        const p2 = authorNew.save();
        let [author, book] = await Promise.all([p1, p2]);
        if (book) {
            res.redirect("/book/");
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
bookRouters.get('/', async (req, res) => {
    try {
        const book = await book_model_1.Book.find().populate({
            path: "author",
            select: "name"
        });
        res.render('listBook', { books: book });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
bookRouters.get('/update/:id', async (req, res) => {
    console.log(req.params);
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id });
        if (book) {
            res.render("updateBook", { books: book });
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
bookRouters.post('/update', upload.none(), async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.body.id });
        if (book) {
            res.redirect('/book/');
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
bookRouters.get('/delete/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id });
        if (book) {
            await book_model_1.Book.remove(book);
            res.redirect('/book/');
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
exports.default = bookRouters;
//# sourceMappingURL=book.router.js.map