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
  let promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("adding promise");
        resolve();
    }, 1000);
  })
  promise.then(data=>{
    return res.status(200).json({message: "Books data fetched successfully", books});
  }).catch(err=>{
    return res.status(500).json({message: "Internam server error"});
  });
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let promise = new Promise((resolve,reject)=>{
    let isbn = parseInt(req.params.isbn);
    let filteredBooks = books[isbn]
    if(filteredBooks){
        resolve(filteredBooks);
    }else{
        reject();
    }
  })
 
  promise.then(data=>{
    return res.status(200).json({message: "Books based on ISBN",data : data});
  }).catch(err=>{
    return res.status(404).json({message : "No Books found"});
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let promise = new Promise((resolve,reject)=>{
    let author = req.params.author;
    const booksArray = Object.entries(books).map(([id, book]) => ({
      id: Number(id),
      ...book,
    }));
    let filteredBooks = booksArray.filter(f=>f.author === author);
    if(filteredBooks){
        resolve(filteredBooks)
    }else{
        reject();
    }
  })
  
  promise.then(data=>{
    return res.status(200).json({message: "Books based on author",data : data});
  }).catch(err=>{
    return res.status(404).json({message : "No Books found"});
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let promise = new Promise((resolve,reject)=>{
        const booksArray = Object.entries(books).map(([id, book]) => ({
            id: Number(id),
            ...book,
          }));
          let filteredBooks = booksArray.filter(f=>f.title === title);
          if(filteredBooks){
            resolve(filteredBooks)
        }else{
            reject();
        }
    })
    
    promise.then(data=>{
        return res.status(200).json({message: "Books based on author",data : data});
      }).catch(err=>{
        return res.status(404).json({message : "No Books found"});
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let review = books[isbn]?.reviews;
  console.log(review,"review");
  return res.status(200).json({message: "Review for ISBN", data : review});
});

module.exports.general = public_users;
