import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header className="navigation">
      <div className="container">
        <nav>
          <Link className="logo" to="/">
            POS-Project
          </Link>
          <ul>
            <li>
              <Link className="nav-link" to="/CategoriesCRUD">
                Categories
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/productsMenu">
                Products
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/carts">
                Carts
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
