const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

// for endpoints beginning with /api/auth

//Login
router.post('/login', (req,res) => {
    let {username, password} = req.body;
    
    Users.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.username = username;
            res.status(200).json({message: `Welcome ${user.username}!`})
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'You shall not pass'})
    })
})

//Register
router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(err => {
        res.status(500).json({message: 'Not able to create new user'})
    })
})

//Users
router.get('/', (req,res) => {
    Users.find()
    .then(users => {
        res.json(users.map((user) => {
            return {id: user.id, username: user.username}
        }))
    })
    .catch(err => {
        res.status(500).json({message: 'You shall not pass'})
    })
})

module.exports = router;
