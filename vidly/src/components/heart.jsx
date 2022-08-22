import React, { Component } from "react";

class Heart extends Component {
  render() {
    const { onLike, movie } = this.props;

    return (
      <i
        className={this.getClasses(movie)}
        aria-hidden="true"
        onClick={() => onLike(movie)}
      ></i>
    );
  }

  getClasses(movie) {
    let classes = "fa fa-heart";
    classes += movie.like === false ? "-o" : "";
    return classes;
  }
}
export default Heart;
