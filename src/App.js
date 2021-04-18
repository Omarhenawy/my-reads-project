import React, { useEffect, useState, useُ } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { debounce } from "throttle-debounce";

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
        setsearchedBooks(books);
      });
    } else {
      setsearchedBooks([]);
    }
  });

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const updatedBooks = Allbooks.map((updatedbook) => {
      if (updatedbook.id === book.id) {
        updatedbook.shelf = shelf;
      }
      return updatedbook;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <Route path="/search">
        <SearchPage
          books={searchedBooks}
          onMove={updateBook}
          search={searchBooks}
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

const BookShelfChanger = ({ shelf, book, onMove }) => {
  const [currentShelf, setShelf] = useState(shelf);

  const HandleChange = (e) => {
    setShelf(e.target.value);
    onMove(book, e.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={HandleChange}>
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

const Book = ({ book, shelf, onMove }) => {
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
          <BookShelfChanger shelf={shelf} book={book} onMove={onMove} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
};

const BookShelf = ({ shelf, books, onMove }) => {
  const bookOnshelf = books.filter((book) => book.shelf === shelf.key);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookOnshelf.map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                shelf={shelf.key}
                onMove={onMove}
              />
            );
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

const BookList = ({ bookshelves, books, onMove }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((shelf) => {
            return (
              <BookShelf
                key={shelf.key}
                shelf={shelf}
                books={books}
                onMove={onMove}
              />
            );
          })}
          ;
        </div>
      </div>
      <AddBookButton />
    </div>
  );
};

const SearchResults = ({ books }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.map((book) => {
          return <Book id={book.id} book={book} shelf="none" />;
        })}
      </ol>
    </div>
  );
};

const SearchInput = ({ books, search }) => {
  const [searchTerm, setSearchTerm] = useState("");
  search(searchTerm);
  return (
    <div className="search-books-input-wrapper">
      {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          {
            console.log(searchTerm);
          }
        }}
      />
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

const SearchBar = ({ books, onMove, search }) => {
  return (
    <div className="search-books-bar">
      <SearchBackButton />
      <SearchInput books={books} onMove={{ books, onMove }} search={search} />
    </div>
  );
};

const SearchPage = ({ books, onMove, search }) => {
  return (
    <div className="search-books">
      <SearchBar books={books} search={search} />
      <SearchResults books={books} onMove={onMove} />
    </div>
  );
};
