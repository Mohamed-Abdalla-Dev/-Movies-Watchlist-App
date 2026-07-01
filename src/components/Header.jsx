import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>Movies App</h1>
          </NavLink>
        </div>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Watch List
          </NavLink>
          <NavLink
            to="/watched"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Watched
          </NavLink>
          <NavLink to="/add" className="add-btn">
            + Add
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
