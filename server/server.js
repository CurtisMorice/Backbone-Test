const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static('server/public'));

const port = 3000;

app.listen(port, function() {
    console.log(`listening on port', ${port}`);
});

