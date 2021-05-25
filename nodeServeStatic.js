const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('build'));

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '/build/')});
});

app.listen(8080, () => {
    console.log('Server listen on port 8080');
});