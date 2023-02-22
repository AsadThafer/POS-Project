import { Link } from "react-router-dom";
import "./CategoryCard.css";
const CategoryCard = ({ category }) => {
  return (
    <div className="categoryCard" key={category.id}>
      <Link className="details_link" to={`/CategoryDetails/${category.id}`}>
        <h3>{category.name}</h3>
      </Link>
    </div>
  );
};

export default CategoryCard;
