import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Heart from "./heart";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentpage: 1,
  };

  constructor() {
    super();
    let movies = getMovies();

    for (let i = 0; i < movies.length; i++) movies[i].like = false;

    this.state.movies = movies;
    console.log("movies", this.state.movies);
  }

  handleDelete = (movie) => {
    const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: newMovies });
  };

  handleLike = (movie) => {
    console.log("Heart clicked for movie", movie);
    const index = this.state.movies.indexOf(movie);
    const movies = this.state.movies;
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const { pageSize, currentPage, movies } = this.state;
    if (movieCount === 0) return <p>There are no movies in the database</p>;
    const pageMovies = paginate(movies, currentPage, pageSize);

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
              <th>Heart</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Heart onLike={this.handleLike} movie={movie} />
                </td>
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

        <Pagination
          movies={this.state.movies}
          moviesPerPage={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
