import { FC } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.scss"
import "./Navbar.scss";

const Navbar: FC = () => {
  const routes = [
    { label: "Home", link: "/home" },
    { label: "Users", link: "/users" },
    { label: "Badges", link: "/badges" },
  ];

  return (
    <nav className={classNames("navbar", [classes.Navbar])}>
      <div className="d-flex align-items-center justify-content-between flex-grow-1 flex-wrap">
        <div className="d-flex">
          {routes.map(({ link, label }) => {
            return <NavLink key={link} to={link} className="nav-link me-4">
              {label}
            </NavLink>
          })}
        </div>

        Welcome to Attrecto Academy
        
      </div>
    </nav>
  );
};

export default Navbar;