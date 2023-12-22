// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// ****************************************************************************************
// GET route to display the form to create a movie
// ****************************************************************************************

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) =>
      res.render("movies/new-movie", { celebrities: celebritiesFromDB })
    )
    .catch((err) =>
      console.log(`Error while getting celebrities from the DB: ${err}`)
    );
});

// ****************************************************************************************
// POST route to submit the form to create a movie
// ****************************************************************************************

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findOne({ title }).then((movieFromDB) => {
    if (!movieFromDB) {
      Movie.create({ title, genre, plot, cast }).then(() =>
        res.redirect("/movies/movies")
      );
    } else {
      res.render("movies/new-movie", {
        message: "It seems this movie is already registred!",
      });
      return;
    }
  });
});

// ****************************************************************************************
// GET route to display all movies from the DB
// ****************************************************************************************

router.get("/movies/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDB) =>
      res.render("movies/movies", { movies: moviesFromDB })
    )
    .catch((err) =>
      console.log(`Error while getting movies from the DB: ${err}`)
    );
});

// ****************************************************************************************
// GET route to display a movie detail from the DB
// ****************************************************************************************

router.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log("movie", movie);
      res.render("movies/movie-details", movie);
    });
});

// ****************************************************************************************
// POST route to delete a movie
// ****************************************************************************************

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies/movies"))
    .catch((err) =>
      console.log(`Error while deleting movie from the DB: ${err}`)
    );
});

// ****************************************************************************************
// GET route to update a movie from the DB
// ****************************************************************************************

router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params;

  Movie.findById(id).then((movie) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("movies/edit-movie", { movie, celebrities });
      })
      .catch((err) => console.log(`Error while updating a movie: ${err}`));
  });
});

// ****************************************************************************************
// POST route to submit the form to update a movie
// ****************************************************************************************

router.post("/movies/:id", (req, res) => {
  console.log("req.body", req.body);
  // const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie._id}`))
    .catch((err) => console.log(err));
});

module.exports = router;
