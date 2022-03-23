import React, { useState, createContext, useEffect } from 'react'
import Movie from './Movie'
import {Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'
import { About, ErrorNotFound } from './Pages'
import MovieForm from './MovieForm'

export const MovieContext = createContext()
export default function MovieList(){
  const [movies, setMovies] = useState()
  const history = useHistory()

  useEffect(() => {
    fetch('./top10.dat')
      .then(response => response.text())
      .then(data => {
        setMovies(JSON.parse(data, (key, value) => {
          const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
          if (typeof value === "string" && dateFormat.test(value)) {
            return new Date(value)
          }

          return value
        }))})
      .catch(console.error)
  }, [])

  if(!movies)
    return <p>Loading...</p>

  return (
    <MovieContext.Provider value={{movies, setMovies}}>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">List</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Route exact path="/movies">
            <button className="primary" onClick={() => {
              movies.sort((a, b) => a.rating - b.rating)
              console.log(movies)
              setMovies(movies.map(m => m))
            }}>Sort</button>
            <button className="primary" onClick={() => {
              history.push('/movies/new')
            }}>Add a movie</button>
          </Route>
        </nav>
        <main>
          <Switch>
            <Route exact path="/movies">
              {movies.map((m, i) => {
                return <Movie key={m.id} movie={m} onLike={
                  () => {
                    movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1

                    setMovies(movies.map(m => m))
                  }
                }/>
              })}
            </Route>
            <Route path="/movies/new"><MovieForm/></Route>
            <Route path="/movies/:mid/edit"><MovieForm/></Route>
            <Route path="/about"><About /></Route>
            <Redirect from="" to ="/movies"/>
            <Route path="*"><ErrorNotFound/></Route>
          </Switch>
        </main>
    </MovieContext.Provider>
  )
}