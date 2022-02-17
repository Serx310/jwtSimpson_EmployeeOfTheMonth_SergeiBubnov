const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://localhost:27017/simpsons', {useUnifiedTopology: true, useNewUrlParser: true});


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
// routes
app.get('*',checkUser);
app.get('/', requireAuth,(req, res) => res.render('index'));
app.use(authRoutes);