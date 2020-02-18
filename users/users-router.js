const router = require('express').Router();
const Users = require('./users-model');
const restricted = require('../api/restricted-middleware');

router.get('/', (req,res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})

module.exports = router;