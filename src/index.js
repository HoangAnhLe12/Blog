const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const sortMiddlewares = require('./app/middleware/sortMiddlewares');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 10 }));

app.use(methodOverride('_method'));

//Custom middlewares
app.use(sortMiddlewares);

//HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine(
   'hbs',
   engine({
      extname: '.hbs',
      helpers: require('./helpers/handlebars'),
   }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
