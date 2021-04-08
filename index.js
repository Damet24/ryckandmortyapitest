const express = require('express');
const app = express();
const path = require('path');

PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, console.log(`server on port ${PORT}`));
