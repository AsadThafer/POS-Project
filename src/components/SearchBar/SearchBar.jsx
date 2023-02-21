import "./SearchBar.css";
const SearchBar = ({ searchTerm, onSearchTermChange, searchType }) => {
  const handleSearchTermChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <div className="SearchBar">
      <label className="SearchLabel" htmlFor="search">
        Search for a {searchType}
      </label>

      <input
        className="SearchInput"
        id="search"
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  );
};

export default SearchBar;
