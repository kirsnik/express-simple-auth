const router = require("express").Router();
const db = require('../../models');
const jwtMiddleware = require('../../lib/auth-middleware');

// Matches with "/api/books"
router.get('/', jwtMiddleware, (req, res) => {
  db.Book
    .find(req.query)
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books"
router.post('/', jwtMiddleware, (req, res) => {
  db.Book
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books/:id"
router.get('/:id', jwtMiddleware, (req, res) => {
  db.Book
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books/:id"
router.put('/:id', jwtMiddleware, (req, res) => {
  db.Book
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books/:id"
router.delete('/:id', jwtMiddleware, (req, res) => {
  db.Book
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
