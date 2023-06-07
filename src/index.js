const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!'
    });
});

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
