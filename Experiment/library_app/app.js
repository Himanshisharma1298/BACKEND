const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

const bookSchema = new mongoose.Schema({
   title: String,
   author: String,
   price: Number
});

const Book = mongoose.model('Book', bookSchema);

app.get('/addbook', async(req,res)=>{
   const book = new Book({
      title:"Node Basics",
      author:"Nidhi",
      price:500
   });

   await book.save();

   res.send("Book Saved");
});


// Fetch Data
app.get('/books', async(req,res)=>{
   const books = await Book.find();
   res.json(books);
});


app.listen(3000, ()=>{
   console.log("Server running on port 3000");
});