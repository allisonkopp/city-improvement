require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const rootRoutes = require('./routes/rootRoutes');
const issueRoutes = require('./routes/issueRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const resultRoutes = require('./routes/resultRoutes');
const feedRoutes = require('./routes/feedRoutes');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env, 999);

mongoose.connect(process.env.DB);
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

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', rootRoutes);
app.use('/issue', issueRoutes);
app.use('/issue', fileUploadRoutes);
app.use('/results', resultRoutes);
app.use('/feed', feedRoutes);

app.listen(PORT, _ => console.log('Express App listening on port 5000'));
