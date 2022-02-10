// Dependencies
const express = require('express')
const Model = require('./users/users-model')
const router = express.Router()

const login = [
    {
        username: 'Shivneel',
        password: 'Prasad1234'
    }
]

router.get('/users', (req, res, next) => {
    Model.findAll()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(next)
})

router.get("/users/:id", (req, res, next) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    const { id } = req.params
    Model.findById(id)
      .then(userData => {
        res.status(200).json(userData)
      })
      .catch(next)
  });

router.post('/register', (req, res, next) => {
    const newUser = req.body
    Model.add(newUser)
        .then(addNewUser => {
            res.status(201).json(addNewUser)
        })
        .catch(next)
})

router.post('/login', (req, res, next) => {
    try {
        if(!login) {
            res.status(404).json({
                message: 'Credentials Invalid'
            })
        } else {
            res.status(200).json({
                message: 'Welcome User'
            })
        }
    } catch (err) {
        next(err)
    }
})

router.delete("/users/:id", async (req, res, next) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    try {
      const { id } = req.params;
      const removeUser = await Model.remove(id);
      res.status(200).json(removeUser);
    } catch (err) {
      next(err);
    }
  });

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: "ERROR ALERT",
      error: err.message,
      stack: err.stack
    });
    next()
});

router.use('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'User Information Not Found',
    })
})

module.exports = router;
