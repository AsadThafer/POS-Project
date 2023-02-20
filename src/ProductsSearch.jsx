const ProductsSearch = ({ searchTerm, onSearchTermChange }) => {
  const handleSearchTermChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <>
      <label className="Searchinfo" htmlFor="search">
        Search for a Product{" "}
      </label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search for a Product"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </>
  );
};

export default ProductsSearch;
