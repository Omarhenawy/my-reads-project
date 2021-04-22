import React, { useEffect, useState, useُ } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { debounce } from "throttle-debounce";

import SearchPage from "./SearchPage";
import BookList from "./BookList";

const BooksApp = () => {
  const bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Have Read" },
  ];
  /* cSpell:disable */
  const [Allbooks, setBooks] = useState([]);
  const [searchedBooks, setsearchedBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);
  const searchBooks = debounce(200, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          setsearchedBooks([]);
        } else {
          setsearchedBooks(books);
        }
      });
    } else {
      setsearchedBooks([]);
    }
  });

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    let newBooklistBooks = Allbooks.filter(
      (updatedbook) => updatedbook.id !== book.id
    );
    if (shelf !== "none") {
      book.shelf = shelf;

      newBooklistBooks = newBooklistBooks.concat(book);
    }
    setBooks(newBooklistBooks);
  };

  return (
    <div className="app">
      <Route path="/search">
        <SearchPage
          searchedBooks={searchedBooks}
          onMove={updateBook}
          search={searchBooks}
          books={Allbooks}
        />
      </Route>
      <Route exact path="/">
        <BookList
          bookshelves={bookshelves}
          books={Allbooks}
          onMove={updateBook}
        />
      </Route>
    </div>
  );
};

export default BooksApp;
