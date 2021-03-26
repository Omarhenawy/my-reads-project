import React, { useState } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import books from "./data";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const BooksApp = () => {
  const bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Have Read" },
  ];
  /* cSpell:disable */
  const Allbooks = books;
  return (
    <div className="app">
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route exact path="/">
        <BookList bookshelves={bookshelves} books={Allbooks} />
      </Route>
    </div>
  );
};

export default BooksApp;

const BookShelfChanger = ({ shelf }) => {
  const [currentShelf, setShelf] = useState(shelf);
  const HandleChange = (e) => {
    setShelf(e.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={() => HandleChange()}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

const Book = ({ book, shelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />
          <BookShelfChanger shelf={shelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

const BookShelf = ({ shelf, books }) => {
  const bookOnshelf = books.filter((book) => book.shelf === shelf.key);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookOnshelf.map((book) => {
            return <Book key={book.id} book={book} shelf={shelf.key} />;
          })}
        </ol>
      </div>
    </div>
  );
};

const AddBookButton = () => {
  return (
    <div className="open-search">
      <Link to="search">
        <button>Add a book</button>
      </Link>
    </div>
  );
};

const BookList = ({ bookshelves, books }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((shelf) => {
            return <BookShelf key={shelf.key} shelf={shelf} books={books} />;
          })}
          ;
        </div>
      </div>
      <AddBookButton />
    </div>
  );
};

const SearchResults = () => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        <Book />
      </ol>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="search-books-input-wrapper">
      {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
      <input type="text" placeholder="Search by title or author" />
    </div>
  );
};

const SearchBackButton = () => {
  return (
    <Link to="/">
      <button className="close-search">Close</button>
    </Link>
  );
};

const SearchBar = () => {
  return (
    <div className="search-books-bar">
      <SearchBackButton />
      <SearchInput />
    </div>
  );
};

const SearchPage = () => {
  return (
    <div className="search-books">
      <SearchBar />
      <SearchResults />
    </div>
  );
};
