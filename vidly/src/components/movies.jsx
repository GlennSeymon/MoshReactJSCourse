import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  constructor() {
    super();
    this.state.movies = getMovies();
  }

  state = {
    movies: [],
  };

  handleDelete = (movie) => {
    console.log("Deleting row ");
  };

  render() {
    return (
      //      <div>Showing {this.state.movies.length} movies in the database</div>
      //    {this.state.movies.length === 0 && "There are no movies"}

      <div>
        <table className={"table"}>
          <thead className={"table-light"}>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    type={"button"}
                    className={"btn btn-danger"}
                    onClick={this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
