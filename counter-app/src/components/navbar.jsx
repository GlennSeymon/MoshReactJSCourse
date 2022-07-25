import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span>
            Number of things in the list:
            {this.props.counters.length}
          </span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
