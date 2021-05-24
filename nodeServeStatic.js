const express = require('express');
const app = express();

app.use(express.static('build'));

app.listen(8080, () => {
    console.log('Server listen on port 8080');
});