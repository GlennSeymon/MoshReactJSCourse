import React, { Component } from "react";

class Heart extends Component {
  render() {
    const { onLike, movie } = this.props;

    return (
      <div>
        <button onClick={() => onLike(movie)}>
          {movie.like === true ? "Unlike" : "Like"}
        </button>

        <i
          className="fa-regular fa-heart-circle-check"
          onClick={() => onLike(movie)}
        >
          <b>Hello</b>
        </i>
      </div>
    );
  }

  getClasses(movie) {
    let classes = "fa-solid fa-heart-circle-check";
    //classes += movie.like === true ? "check" : "xmark";
    return classes;
  }
}
export default Heart;
