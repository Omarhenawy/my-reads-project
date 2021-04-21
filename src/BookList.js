import BookShelf from "./BookShelf";
import AddBookButton from "./AddBookButton";
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
export default BookList;
