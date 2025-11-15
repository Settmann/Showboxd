require('dotenv').config();
const cors = require('cors'); 

const express = require('express');
const app = express();
const router = require('./routes/show.routes');

app.use(express.static('../client/build'));
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use('/api/v1/shows', router);


app.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = app;

