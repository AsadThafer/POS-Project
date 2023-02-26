import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoriesTable from "../../components/CategoriesTable/CategoriesTable";

const CategoriesCRUD = () => {
  const [newName, setNewName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

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
  }, [categories.length]);

  const onSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <>
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

      <CategoriesTable data={filteredCategories}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          searchType="category"
        />
      </CategoriesTable>
    </>
  );
};

export default CategoriesCRUD;
