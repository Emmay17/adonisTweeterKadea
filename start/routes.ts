/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PostsController from '../app/controllers/posts_controller.js'
// import Router from '@adonisjs/core/services/Route'

router.on('/').render('pages/dashboard')
router.get('/posts',[PostsController,'getPosts'])