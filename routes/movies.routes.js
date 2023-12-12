// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// ****************************************************************************************
// GET route to display the form to "create" a movie
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
// POST route to submit the form to create a celebrity
// ****************************************************************************************

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findOne({ title }).then((movieFromDB) => {
    if (!movieFromDB) {
      Movie.create({ title, genre, plot, cast }).then(() =>
        res.redirect("/movies/movies")
      );
    } else {
      res.render("/movies/new-movie", {
        message: "It seems this movie is already registred!",
      });
      return;
    }
  });
});

// ****************************************************************************************
// GET route to display all celebrities from the DB
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

module.exports = router;
