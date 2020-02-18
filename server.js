'use strict';

const express = require('express');

const morgan = require('morgan');

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here

//top 50
app.get('/top50', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
        top50: top50
    });
});
//top artist
app.get('/top50/popular-artist', (req, res) => {
    res.render('pages/popular-artist', {
        title: 'Top Artist Streamed on Spotify',
        top50: top50
    });
});
//song//#
app.get('/song/:number', (req, res) => {
    let number = req.params.number;
    let selectSong = top50.filter((item) => item.rank == number);
    if (number > 0 && number <51){
        res.render('pages/song#', {
            title: `Song #${number}`,
            selectSong: selectSong[0]
        });
    } else {
        res.status(404);
        res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
    }
});

//homepage
app.get('/', (req, res) => {
    res.send('hi');
});
// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
