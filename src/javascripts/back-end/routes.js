import express from 'express'
let router = express.Router()
import { allMoviesAPI, indexPage, teamPage, aboutPage } from './controllers/index'

export function configureRoutes(app){
  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages
  router.get('', (req, res) => res.redirect(301, '/movies'))
  router.get('/movies*', indexPage)
  router.get('/team', teamPage)
  router.get('/about', aboutPage)

  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
   router.get('/api/movies', allMoviesAPI)

  app.use('/', router)
}