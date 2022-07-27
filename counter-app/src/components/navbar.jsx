import React from "react";

// Stateless functional component
const NavBar = (props) => {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <span>
          Number of things in the list:
          {props.counters.length}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
