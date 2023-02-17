import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Test = () => {
  const ref = useRef(null);
  const [newName, setNewName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState("");

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
    };

    createPost();
    setNewName("");
  };
  const updateCategory = async (id, name, datetime) => {
    const doc = {
      name: name,
      createdTime: datetime,
    };
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(doc),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const newCategories = categories.map((category) => {
        if (category.id === id) {
          return { id, name, createdTime: datetime };
        }
        return category;
      });
      setCategories(newCategories);
      stopUpdate();
    }
    if (!res.ok) {
      alert("Error updating category");
      stopUpdate();
    }
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const newCategories = categories.filter((category) => category.id !== id);
      setCategories(newCategories);
    }
    if (!res.ok) {
      alert("Error deleting category");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      let uri = "http://localhost:3000/categories";
      const response = await fetch(uri);
      const data = await response.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  const startEdit = (id, name) => {
    setUpdateName(name);
    document.getElementById("update_name").focus();
    document.getElementById("confirm_update").addEventListener("click", () => {
      updateCategory(
        id,
        document.getElementById("update_name").value,
        new Date()
      );
    });
  };

  const stopUpdate = () => {
    setUpdateName("");
  };

  return (
    <div>
      <input
        placeholder="Category name"
        type="text"
        required
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button className="create_button" onClick={createCategory}>
        create Category
      </button>
      <h1>Cateogires</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <h3>{category.createdTime.toString()}</h3>
          <button
            className="update_button"
            ref={ref}
            onClick={() => startEdit(category.id, category.name)}
          >
            Begin Update
          </button>
          <button
            className="delete_button"
            onClick={() => deleteCategory(category.id)}
          >
            Delete Category
          </button>
          <Link className="details_link" to={`/CategoryDetails/${category.id}`}>
            Details
          </Link>
        </div>
      ))}
      <div>
        <input
          placeholder=""
          type="text"
          id="update_name"
          required
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          disabled={updateName === ""}
        />
        <button id="confirm_update">update category</button>
        <button onClick={stopUpdate}>Cancel Update</button>
      </div>
    </div>
  );
};

export default Test;
