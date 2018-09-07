const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + '\n', (err) => {
        console.log("cannot update the log file");
    });
    next();
});

// app.use((req, res, next) => {
//     res.render("maintainence.hbs");
// });

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomemsg: "Welcome to my website", pageTitle: "Home page"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});