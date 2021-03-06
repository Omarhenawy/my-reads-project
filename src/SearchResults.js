import Book from "./Book";
const SearchResults = ({ searchedBooks, onMove, books }) => {
  searchedBooks.map((book) => {
    books.map((onShelf) => {
      if (onShelf.id === book.id) {
        book.shelf = onShelf.shelf;
      }
      return onShelf;
    });
    return book;
  });

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {searchedBooks.map((book) => {
          return (
            <Book
              key={book.id}
              book={book}
              shelf={book.shelf ? book.shelf : "none"}
              onMove={onMove}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default SearchResults;
