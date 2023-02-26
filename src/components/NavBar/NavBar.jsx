/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import authentication from "../../pages/Login/authentication";
import "./NavBar.css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
          <Link className="logo" to="/">
            POS-Project
          </Link>
        </h1>
        <div className="menu-icon" onClick={toggleMenu}>
          {showMenu ? <MdClose /> : <FaBars />}
        </div>
        {authentication() ? (
          <ul className={`menu ${showMenu ? "show" : ""}`}>
            <li>
              <Link to="/CategoriesCRUD">Categories</Link>
            </li>
            <li>
              <Link to="/productsMenu">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link className="nav-link logout" to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
