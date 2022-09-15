"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const keywordsSchema = new mongoose_1.Schema({
    keywords: String
});
const keywords = (0, mongoose_1.model)('keyword', keywordsSchema);
const bookSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "Author" },
    keywords: [keywordsSchema]
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map