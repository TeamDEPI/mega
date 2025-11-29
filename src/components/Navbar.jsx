import React, { useState } from "react";
import "../assets/css/Navbar.css";
import logo from "../assets/images/login/logo.png";
import plus from "../assets/images/login/+.png";
import Dropdown from "./DropdownNav";
import { IoMenu, IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo" style={{ textDecoration: "none" }}>
        <img
          src={logo}
          style={{ height: "65px", width: "70px", marginRight: "15px" }}
          alt="Logo"
        />
        HealthyMe
        <img src={plus} alt="Plus Icon" />
      </NavLink>

      <div className="mobile-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <IoClose size={40} /> : <IoMenu size={40} />}
      </div>

      <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/find-doctor">Find a doctor</NavLink>
        <NavLink to="/apps">Apps</NavLink>
        <NavLink to="/testimonials">Testimonials</NavLink>
        <NavLink to="/about">About us</NavLink>
      </nav>

      <div className={`auth-actions ${isMenuOpen ? "active" : ""}`}>
        <Dropdown />
        <NavLink to="/login" className="sign-in-link">
          Sign In
        </NavLink>
        <NavLink to="/register">
          <button className="register-button">Register</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Nav;
