const db =require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

function find() {
    return db("users").select("id", "username");
}

function findBy() {
    return db('users').select('id', 'username', 'password')
}

function findById(id) {
    return db('users').select('id', 'username').where({id})
}