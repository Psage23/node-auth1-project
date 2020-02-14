const db =require('../data/dbConfig');

module.exports = {
    add,
    find,
    findby,
    findById
}

function find() {
    return db("users").select("id", "username");
}