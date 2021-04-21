import Book from "./Book";
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
export default BookShelf;
