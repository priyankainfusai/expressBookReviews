const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({message: "Books data fetched successfully", books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  const booksArray = Object.entries(books).map(([id, book]) => ({
    id: Number(id),
    ...book,
  }));
  let filteredBooks = booksArray.filter(f=>f.ISBN === isbn);
  if(filteredBooks.length > 0){

      return res.status(200).json({message: "Books based on ISBN",data : filteredBooks});
  }else{
    return res.status(404).json({message : "No Books found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  const booksArray = Object.entries(books).map(([id, book]) => ({
    id: Number(id),
    ...book,
  }));
  let filteredBooks = booksArray.filter(f=>f.author === author);
  if(filteredBooks.length > 0){

      return res.status(200).json({message: "Books based on Author",data : filteredBooks});
  }else{
    return res.status(404).json({message : "No Books found"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    const booksArray = Object.entries(books).map(([id, book]) => ({
      id: Number(id),
      ...book,
    }));
    let filteredBooks = booksArray.filter(f=>f.title === title);
    if(filteredBooks.length > 0){
  
        return res.status(200).json({message: "Books based on title",data : filteredBooks});
    }else{
      return res.status(404).json({message : "No Books found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
