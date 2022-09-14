import {Schema,model} from 'mongoose';

interface IBook{
    title : string;
    description : string;
    author : string;
    keywords: object[];
}

const keywordsSchema = new Schema({
    keywords : String
})

const bookSchema = new Schema<IBook>({
    title : String,
    description : String,
    author : String,
    keywords:[keywordsSchema]
});

const Book = model<IBook>('Book',bookSchema);

export {Book}