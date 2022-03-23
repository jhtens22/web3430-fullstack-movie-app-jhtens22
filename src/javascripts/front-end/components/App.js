import React from 'react'
import MovieList from './MovieList'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main(){
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Top 10 Movies</h1>
        </header>
        <MovieList/>
      </div>
      <footer>&copy; All rights reserved!</footer>
    </Router>
  )
}
