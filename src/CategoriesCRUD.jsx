import { useState, useEffect, useRef } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Test = () => {
  const ref = useRef(null);
  const [newName, setNewName] = useState("");
  const [newCreatedTime, setNewCreatedTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const categoriesCollectionRef = collection(db, "Categories");

  const createCategory = async () => {
    await addDoc(categoriesCollectionRef, {
      name: newName,
      createdTime: new Date(newCreatedTime),
    });
  };

  const updateCategory = async (id, name, datetime) => {
    const categoryDoc = doc(db, "Categories", id);
    await updateDoc(categoryDoc, {
      name: name,
      createdTime: new Date(datetime),
    });
  };

  const deleteCategory = async (id) => {
    const categoryDoc = doc(db, "Categories", id);
    await deleteDoc(categoryDoc);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCategories();
  }, [categoriesCollectionRef]);

  const startEdit = (id, name) => {
    setUpdateName(name);
    document.getElementById("update_name").focus();
    document.getElementById("confirm_update").addEventListener("click", () => {
      confirmEdit(id);
    });
  };

  const confirmEdit = (id) => {
    ref.current.removeEventListener("click", confirmEdit);
    updateCategory(
      id,
      document.getElementById("update_name").value,
      new Date()
    );
    cancelUpdate();
  };

  const cancelUpdate = () => {
    setUpdateName("");
  };

  return (
    <div>
      <input
        placeholder="name"
        type="text"
        required
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="datetime-local"
        required
        onChange={(e) => setNewCreatedTime(e.target.value)}
      />
      <button className="create_button" onClick={createCategory}>
        create category
      </button>
      <h1>Cateogires</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <h3>{category.createdTime.toDate().toString()}</h3>
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
        </div>
      ))}
      <div>
        <input
          placeholder="name"
          type="text"
          id="update_name"
          required
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <button id="confirm_update">update category</button>
        <button onClick={cancelUpdate}>Cancel Update</button>
      </div>
    </div>
  );
};

export default Test;
