import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bookRouters from "./src/router/book.router";
import path from "path";


const port = 3000;
const app= express();
app.set('view engine','ejs');
app.set('views','./src/views');


const DB_URL = 'mongodb://localhost:27017/huydo';
mongoose.connect(DB_URL)
.then(()=>{
    console.log(`Connected`);
}).catch(err=>{
    console.log(`Connected fail , error : ${err.message}`);
});
app.use(bodyParser.json());

app.use('/book',bookRouters);



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
