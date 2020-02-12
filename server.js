const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello App')
})

server.listen(6000, () => console.log('Server is running'))