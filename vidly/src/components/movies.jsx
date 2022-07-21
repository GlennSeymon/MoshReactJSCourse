import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  constructor() {
    super();
    this.state.movies = getMovies();
  }

  state = {
    movies: [],
  };

  handleDelete = (movie) => {
    console.log("Deleting row ", movie);
    const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: newMovies });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        <p>There are {movieCount} movies in the database.</p>
        <table className="table">
          <thead className="table-light">
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
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
