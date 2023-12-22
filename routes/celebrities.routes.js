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

// ****************************************************************************************
// GET route to display a celebrity detail from the DB
// ****************************************************************************************

router.get("/celebrities/:id", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id).then((celebrity) => {
    console.log("celebrity", celebrity);
    res.render("celebrities/celebrity-details", celebrity);
  });
});

// ****************************************************************************************
// POST route to delete a celebrity
// ****************************************************************************************

router.post("/celebrities/:id/delete", (req, res) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities/celebrities"))
    .catch((err) =>
      console.log(`Error while deleting celebrity from the DB: ${err}`)
    );
});

// ****************************************************************************************
// GET route to update a celebrity from the DB
// ****************************************************************************************

router.get("/celebrities/:id/edit", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrity", { celebrity });
    })
    .catch((err) => console.log(`Error while updating a movie: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to update a celebrity
// ****************************************************************************************

router.post("/celebrities/:id", (req, res) => {
  console.log("req.body", req.body);
  // const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedCelebrity) =>
      res.redirect(`/celebrities/${updatedCelebrity._id}`)
    )
    .catch((err) => console.log(err));
});

module.exports = router;
