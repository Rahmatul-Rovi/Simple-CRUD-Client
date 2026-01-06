import React from "react";
import { NavLink } from "react-router";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
     <Navbar>
        <NavLink to="/">Home</NavLink>
     </Navbar>
    </div>
  );
};

export default Header;
