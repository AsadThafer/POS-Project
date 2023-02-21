import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./components/Button/Button";
import SearchBar from "./components/SearchBar/SearchBar";
const Test = () => {
  const [newName, setNewName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories); // [state, setState]

  const createCategory = async () => {
    if (newName === "") {
      return;
    }
    const createPost = async () => {
      const doc = {
        name: newName,
        createdTime: new Date(),
      };
      await fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
    };

    createPost();
    setNewName("");
  };

  useEffect(() => {
    const getCategories = async () => {
      let uri = "http://localhost:3000/categories";
      const response = await fetch(uri);
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
    };
    getCategories();
  }, []);

  const onSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div>
      <label htmlFor="categoryName">Category Name</label>
      <input
        type="text"
        required
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button design="create" onClick={createCategory}>
        Create Category
      </Button>
      <h1>Cateogires</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
        searchType="category"
      />
      <div className="categories">
        {filteredCategories.map((category) => (
          <div className="category" key={category.id}>
            <h2>{category.name}</h2>
            <Link
              className="details_link"
              to={`/CategoryDetails/${category.id}`}
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
