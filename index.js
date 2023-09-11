const express = require('express');
// const mongoose = require('mongoose');
// const validator = require("validator");

const app = express();

const movies = [
    {
        id: 1,
        title: "Iron Man",
        director: "Jon Favreau",
        producer: "Kevin Fiege",
        releaseDate: "May 2, 2008",
        boxOffice: "58.58 Cr",
        imageUrl: "https://cdn.marvel.com/content/1x/ironman_lob_crd_01_4.jpg"
    },
    {
        id: 2,
        title: "The Incredible Hulk",
        director: "Louis Leterrier",
        producer: "Kevin Fiege",
        releaseDate: "20 June 2008",
        boxOffice: "$264.8 million",
        imageUrl: "https://cdn.marvel.com/content/1x/theincrediblehulk_lob_crd_03.jpg"
    },
    {
        id: 3,
        title: "Iron Man 2",
        director: "Jon Favreau",
        producer: "Kevin Fiege",
        releaseDate: "7 May 2010",
        boxOffice: "62.39 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/ironman2_lob_crd_01_3.jpg"
    },
    {
        id:4,
        title: "Thor",
        director: "Kenneth Branagh",
        producer: "Kevin Fiege",
        releaseDate: "29 April 2011",
        boxOffice: "44.93 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/thor_lob_crd_01.jpg"
    },
    {
        id: 5,
        title: "Captain America: The First Avenger",
        director: "Joe Johnston",
        producer: "Kevin Fiege",
        releaseDate: "29 July 2011",
        boxOffice: "37.06 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/captainamerica_lob_crd_01.jpg"
    },
    {
        id: 6,
        title: "The Avengers",
        director: "Joss Whedon",
        producer: "Kevin Fiege",
        releaseDate: "27 April 2012",
        boxOffice: "151.9 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/theavengers_lob_crd_03.jpg"
    },
    {
        id: 7,
        title: "Iron Man 3",
        director: "Shane Black",
        producer: "Kevin Fiege",
        releaseDate: "26 April 2013",
        boxOffice: "121.5 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/ironman3_lob_crd_01_10.jpg"
    },
    {
        id: 8,
        title: "Thor: The Dark World",
        director: "Alan Taylor",
        producer: "Kevin Fiege",
        releaseDate: "8 November 2013",
        boxOffice: "$644.8 million",
        imageUrl: "https://cdn.marvel.com/content/1x/thorthedarkworld_lob_crd_02_1.jpg"
    },
    {
        id: 9,
        title: "Captain America: The Winter Soldier",
        director: "Joe Russo",
        producer: "Kevin Fiege",
        releaseDate: "4 April 2014",
        boxOffice: "17 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/captainamericathewintersoldier_lob_crd_01_1.jpg"
    },
    {
        id: 10,
        title: "Guardians of the Galaxy",
        director: "James Gunn",
        producer: "Kevin Fiege",
        releaseDate: "8 August 2014",
        boxOffice: "77.33 crores USD",
        imageUrl: "https://cdn.marvel.com/content/1x/guardiansofthegalaxy_lob_crd_03.jpg"
    },
]



app.use(express.json())

app.get('/', (req,res) => {
    res.send("<h1>Welcome to Movies Application</h1>");
})

// GET ALL MOVIES
app.get("/movies", (req, res) => {
    res.send(movies)
});

// GET ONLY ONE MOVIE
app.get("/movies/:id", (req, res) => {
    const oneMovie = movies.find(movie => movie.id.toString() === req.params.id)

    if(oneMovie) {
        res.send(oneMovie);
    } else {
        res.status(404).send("Not Found");
    }
});

// CREATE NEW DATA OF MOVIE
app.post("/movies", (req,res) => {
    const newMovie = req.body;
    movies.push(newMovie);

    res.status(201).send('New Movie Added');
})

//  UPADTE MOVIE DETAILS
app.patch("/movies/:id", (req, res) => {
    const id = req.params.id;
    const newMovieData = req.body;

    const movieData = movies.findIndex(movie => movie.id.toString() === id);
    if(movieData > -1) {
        const oldMovieData = movies[movieData];
        movies[movieData] = {
            ...oldMovieData,
            ...newMovieData,
        }
        res.send('Movie Data Updated')
    } else {
        res.status(404).send('Not found')
    }
})

// DELETE MOVIE DATA 
app.delete("/movies/:id", (req, res) => {
    const movieData = movies.findIndex(movie => movie.id.toString() === req.params.id)

    if(movieData > -1) {
        movies.splice(movieData, 1)
        res.send("Movie Deleted");
    } else {
        res.status(404).send('Not found');
    }
})



app.listen(8001,() => {
    console.log("Server Running on 8001");
});