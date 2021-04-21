import Book from "./Book";
const SearchResults = ({ searchedBooks, onMove, books }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {searchedBooks.map((book) => {
          return <Book id={book.id} book={book} shelf="none" onMove={onMove} />;
        })}
      </ol>
    </div>
  );
};

export default SearchResults;
