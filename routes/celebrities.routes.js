// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here

// ****************************************************************************************
// GET route to display the form to "create" a celebrity
// ****************************************************************************************

router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity")
);

// ****************************************************************************************
// POST route to submit the form to create a celebrity
// ****************************************************************************************

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOne({ name }).then((celebrityFromDB) => {
    if (!celebrityFromDB) {
      Celebrity.create({ name, occupation, catchPhrase }).then(() =>
        res.redirect("/celebrities/celebrities")
      );
    } else {
      res.render("celebrities/new-celebrity", {
        message: "It seems this celebrity is already registered!",
      });
      return;
    }
  });
});

module.exports = router;

// ****************************************************************************************
// GET route to display all celebrities from the DB
// ****************************************************************************************

router.get("/celebrities/celebrities", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) =>
      res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
    )
    .catch((err) =>
      console.log(`Error while getting celebrities from the DB: ${err}`)
    );
});
