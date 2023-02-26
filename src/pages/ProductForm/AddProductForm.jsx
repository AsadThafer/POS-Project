import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCategory from "../../helpers/fetchCategories/fetchCategory";
import Button from "../../components/Button/Button";
import fetchCategories from "../../helpers/fetchCategories/fetchCategories";
import { useFormik } from "formik";

const AddProductForm = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let { id } = useParams();

  const results = useQuery(["details", id], fetchCategory);
  const categories = useQuery(["categories"], fetchCategories);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }
    if (!values.price) {
      errors.price = "Required";
    } else if (values.price.length > 15) {
      errors.price = "Must be 15 characters or less";
    }
    if (!values.description) {
      errors.description = "Required";
    } else if (values.description.length > 15) {
      errors.description = "Must be 15 characters or less";
    }
    if (!values.code) {
      errors.code = "Required";
    } else if (values.code.length > 15) {
      errors.code = "Must be 15 characters or less";
    }
    if (!values.image) {
      errors.image = "Required";
    } else if (values.image.length < 10) {
      errors.image = "image must be a link";
    }
    if (!values.categoryId) {
      errors.categoryId = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      code: "",
      image: "",
      categoryId: id ? id : "",
    },
    onSubmit: (values) => {
      const product = values;
      product.createdTime = new Date();
      if (product.categoryId === id) {
        fetch(`http://localhost:3000/categories/${id}/products`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.ok) {
            navigate(`/CategoryDetails/${id}`);
          }
        });
      }
      if (product.categoryId !== id) {
        fetch(
          `http://localhost:3000/categories/${product.categoryId}/products`,
          {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            navigate(`/CategoryDetails/${product.categoryId}`);
          }
        });
      }
    },
    validate,
  });

  if (results.isError) {
    return (
      <div className="error-pane">
        <h2>There was an error. Please try again.</h2>
      </div>
    );
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↻</h2>
        <h3>Loading.....</h3>
      </div>
    );
  }

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

  const category = results.data;
  const categoryList = categories.data;
  return (
    <div className="details">
      {id ? (
        <>
          <h2>
            Category Name :{" "}
            {category.name ? category.name : "No specific category"}
          </h2>
          <h3>
            Category ID : {category.id ? category.id : "No specific category"}
          </h3>
        </>
      ) : null}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="form-error">{formik.errors.name}</div>
        ) : null}
        <label htmlFor="price">Product Price</label>
        <input
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          required
        />
        {formik.touched.price && formik.errors.price ? (
          <div className="form-error">{formik.errors.price}</div>
        ) : null}
        <label htmlFor="code">Product Code</label>
        <input
          name="code"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          required
        />
        {formik.touched.code && formik.errors.code ? (
          <div className="form-error">{formik.errors.code}</div>
        ) : null}
        <label htmlFor="description">Product Description</label>
        <input
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          required
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="form-error">{formik.errors.description}</div>
        ) : null}
        <label htmlFor="image">Product Image</label>
        <input
          name="image"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.image}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="form-error">{formik.errors.image}</div>
        ) : null}
        <label htmlFor="categoryId">Product Category</label>
        <select
          name="categoryId"
          id="categoryId"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryId}
        >
          <option value="">not selected yet</option>
          {categoryList.map((categoryelement) => (
            <option key={categoryelement.id} value={categoryelement.id}>
              {categoryelement.name}
            </option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId ? (
          <div className="form-error">{formik.errors.categoryId}</div>
        ) : null}

        <Button type="submit">Add Product</Button>
      </form>
      <Button design={"back"} onClick={() => navigate("/")}>
        Back Home
      </Button>
    </div>
  );
};

export default AddProductForm;
