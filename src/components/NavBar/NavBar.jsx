import authentication from "../../Login/authentication";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };
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
            {authentication() ? (
              <li>
                <Link className="nav-link logout" to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
