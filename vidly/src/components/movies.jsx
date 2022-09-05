import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Heart from "./heart";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentpage: 1,
    selectedGenre: null,
    allMovies: [],
    allGenres: null,
  };

  componentDidMount() {
    const allGenres = { _id: "", name: "All Genres" };
    const genres = [allGenres, ...getGenres()];
    const movies = getMovies();

    console.log("allGenres", allGenres);
    console.log("genres", genres);

    for (let i = 0; i < movies.length; i++) movies[i].like = false;

    this.setState({
      movies: movies,
      genres: genres,
      allMovies: movies,
      selectedGenre: allGenres,
      allGenres: allGenres,
    });
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      allMovies,
      allGenres,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movieCount = filtered.length;
    if (movieCount === 0) return <p>There are no movies in the database</p>;

    const pageMovies = paginate(filtered, currentPage, pageSize, selectedGenre);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>

            <div className="col">
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
                movies={filtered}
                moviesPerPage={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
