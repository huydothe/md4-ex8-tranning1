import {Router} from "express";
import {Book} from "../schemas/book.model";
import multer from 'multer';
import {Author} from "../schemas/author.model";

const bookRouters = Router();
const upload = multer();


bookRouters.get('/create',(req, res)=>{
    res.render('createBook')
});

bookRouters.post('/create',upload.none(),async (req,res)=>{
    try{
        const authorNew = new Author({
            name:req.body.author
        })

        const bookNew = new Book({
            title: req.body.title,
            description: req.body.description,
            author: authorNew,
            // keywords:[{keyword: req.body.keywords}]
        })
        // bookNew.keywords.forEach(e=>{
        //     console.log(e.keywords);
        // })
        // bookNew.keywords.forEach(e=>{

        //     console.log(e.keyword);
        // });
        bookNew.keywords.push({ keywords: req.body.keywords });
        // console.log(bookNew.keywords)
        bookNew.keywords.forEach(e=>{
            // @ts-ignore
            console.log(e.keywords);
        })

        const p1 = bookNew.save();
        const p2 = authorNew.save();
        let [author,book] = await Promise.all([p1,p2]);

        if(book){
            res.redirect("/book/")
        }else {
            res.render('error');
        }
    }catch (err){
        res.status(500).json({
            message : err.message
        });
    }
})

bookRouters.get('/',async (req,res)=>{
    try{
        let query = {};

        if(req.query.keywords && req.query.keywords !== ''){
            let keywordFind = req.query.keywords || '';
            query = {
                "keywords.keywords" : {
                    $regex : keywordFind
                }
            }
        }
        if(req.query.author && req.query.author !== ''){
            let authorFind = req.query.author || '';
            let author =await Author.findOne({name:{$regex : authorFind}});
            query = {
                ...query, author : author
            }
        }

        const book = await Book.find(query).populate({
            path:"author",
            select:"name"
        }).populate({
            path:"keywords",
            select: "keywords"
        });
        console.log(book[0])
        res.render('listBook',{books:book});
    }catch (err){
        res.status(500).json({
            message : err.message
        });
    }
})

bookRouters.get('/update/:id',async (req,res)=>{
    console.log(req.params)
    try{
        const book = await Book.findOne({_id:req.params.id});
        if(book){
            res.render("updateBook",{books:book});
        }else {
            res.render('error');
        }
    }catch (err){
        res.status(500).json({
            message : err.message
        });
    }
})

bookRouters.post('/update', upload.none(), async (req,res)=>{
    try{
        const book = await Book.findOne({_id:req.body.id});
        // await Book.update(book, req.body);
        if(book){
            res.redirect('/book/')
        }else {
            res.render('error');
        }
    }catch (err){
        res.status(500).json({
            message : err.message
        });
    }
});

bookRouters.get('/delete/:id',async(req,res)=>{
    try{
        const book = await Book.findOne({_id:req.params.id});
        if(book){
            await Book.remove(book);
            res.redirect('/book/')
        }else {
            res.render('error');
        }
    }catch (err){
        res.status(500).json({
            message : err.message
        });
    }
})

export default bookRouters;