import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
const SearchPage = ({ books, onMove, search, searchedBooks }) => {
  return (
    <div className="search-books">
      <SearchBar books={books} search={search} />
      <SearchResults
        books={books}
        onMove={onMove}
        searchedBooks={searchedBooks}
      />
    </div>
  );
};
export default SearchPage;
