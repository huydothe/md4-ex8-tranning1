import {Schema, model} from "mongoose";

const authorSchema = new Schema({
    name : String
});

const Author = model('Author',authorSchema);

export {Author};