const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json())

const mongoURI = 'mongodb://127.0.0.1:27017/api';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to db')).catch((err) => console.error(err))

const MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    producer: String,
    releaseDate: String,
    boxOffice: String,
    imageUrl: String,
});

const Movie = mongoose.model("Movie", MovieSchema)

app.get("/", (req,res) => {
    res.send("<h1>Welcome to Movies Application</h1>");
})

app.post('/movies', async (req, res) => {
    try {
      const newMovies = new Movie(req.body);
      const movieItem = await newMovies.save();
      res.json(movieItem);
    } catch (err) {
        console.error(err)
      res.status(404).send("Not Found");
    }
  });

app.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (err) {
      res.status(404).send("Not Found");
    }
  });

  app.get('/movies/:id', async (req, res) => {
    try {
      const movies = await Movie.findById(req.params.id);
      res.json(movies);
    } catch (err) {
      res.status(404).send("Not Found");
    }
  });

  app.patch('/movies/:id', async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedMovie);
    } catch (error) {
      res.status(400).json("Not Found");
    }
  });

  app.delete('/movies/:id', async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.json("Movie Deleted Successfully");
    } catch (error) {
      res.status(404).json("Not Found");
    }
  });


app.listen(8002,() => {
    console.log("Server Running on 8002");
});