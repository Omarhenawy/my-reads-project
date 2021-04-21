import SearchBackButton from "./SearchBackButton";
import SearchInput from "./SearchInput";
const SearchBar = ({ books, onMove, search }) => {
  return (
    <div className="search-books-bar">
      <SearchBackButton />
      <SearchInput books={books} onMove={{ books, onMove }} search={search} />
    </div>
  );
};
export default SearchBar;
