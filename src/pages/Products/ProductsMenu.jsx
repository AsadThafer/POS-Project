import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import fetchCategories from "../../helpers/fetchCategories/fetchCategories";
import Table from "../../components/Table/Table";

const ProductsMenu = ({ onSuccessfullAdd, type }) => {
  const [products, setProducts] = useState([]); // [state, setState]
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products); // [state, setState]
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useQuery(["categories"], fetchCategories, {
    staleTime: 300000,
    refetchInterval: 300000,
    refetchIntervalInBackground: true,
  });
  useEffect(() => {
    const getProducts = async () => {
      let uri = "http://localhost:3000/products";
      const response = await fetch(uri);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    getProducts();
  }, []);

  const onSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const onCategoryFilterChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
    setFilteredProducts(
      products.filter((product) => product.categoryId === categoryFilter)
    );
    if (categoryFilter === "") {
      setFilteredProducts(products);
    }
  };

  if (categories.isLoading)
    return (
      <div className="loading-pane">
        {" "}
        <h2 className="loader">↻</h2>{" "}
      </div>
    );
  if (categories.isError)
    return (
      <div className="error-pane">
        {" "}
        <h2>There was an error. Please try again.</h2>{" "}
      </div>
    );

  const categoryList = categories.data;

  const addedToCart = (product) => {
    onSuccessfullAdd(product);
  };

  return (
    <div className="ProductsMenu">
      <Table
        data={filteredProducts}
        addedToCartInProductmenu={addedToCart}
        type={type}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchTermChange={onSearchTermChange}
          searchType={"product"}
        />
        <div className="CategoryFilter">
          <label className="Category_filter_label" htmlFor="category">
            Filter by Category
          </label>
          <select
            id="category"
            name="category"
            value={categoryFilter}
            onChange={(event) => onCategoryFilterChange(event.target.value)}
          >
            <option value="">All</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </Table>
    </div>
  );
};

export default ProductsMenu;
