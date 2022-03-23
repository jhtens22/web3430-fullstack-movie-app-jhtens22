import { Movie } from "../models/movie"

// GET /api/movies
export const allMoviesAPI = (req, res, next) => {
  Movie.find().select('-reviews').exec((err, movies)=> {
    if(err){
      res.json({success: false, message: "Query failed"})
      res.end()
    }else{
      res.write(JSON.stringify(movies))
      res.end()
    }
  })
}

// GET /
export const indexPage = (req, res, next) => {
  res.render('index')
}

// GET /team
export const teamPage = (req, res, next) => {
  const members = [
    { fn: "Jane", ln: "Smith" },
    { fn: "Mark", ln: "Doe" }
  ]
  res.render('team', { members })
}

export const aboutPage = (req, res, next) => {
  res.render('about')
}