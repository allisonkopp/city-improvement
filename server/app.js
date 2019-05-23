require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const rootRoutes = require('./routes/rootRoutes');
const bookRoutes = require('./routes/bookRoutes');
const issueRoutes = require('./routes/issueRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const resultRoutes = require('./routes/resultRoutes');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/city-improvement');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(
  session({
    secret: 'hello world',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
  })
);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', rootRoutes);
app.use('/books', bookRoutes);
app.use('/issue', issueRoutes);
app.use('/issue', fileUploadRoutes);
app.use('/results', resultRoutes);

app.listen(5000, _ => console.log('Express App listening on port 5000'));
