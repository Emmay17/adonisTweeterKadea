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
import PermissionsController from '#controllers/permissions_controller'
import AuthController from '#controllers/auth_controller'
// import isAdminMiddleware from '#middleware/is_admin_middleware'
// import IsAdminMiddleware from '#middleware/is_admin_middleware'
import { middleware } from './kernel.js'
import TweetsController from '#controllers/tweets_controller'
// import Router from '@adonisjs/core/services/Route'

router.get('/', [AuthController, 'show']).as('home')
router.get('/dashboard', [PostsController, 'getPosts']).as('dashboard.login').use(middleware.nonPublic())

router.group(() =>{
    // router.post('/save', [PostsController, 'savePost']).as('poste.create')
    router.post('/saveDB', [PostsController, 'saveOnDatabase']).as('poste.createDB')
    // router.post('/:id/Like', [PostsController, 'savelike']).as('poste.like')
}).prefix('/posts')

router.group(() => {
    router.get('/', [PermissionsController, 'pagePermission'])
    router.post('/register', [PermissionsController, 'createPermission']).as('permissions.create')
    // router.get('/getall',[PermissionsController, 'getallPermission']).as('permissions.getAll')
}).prefix('/permissions')

router.group(() => {
    router.get('/', [AuthController , 'show'])
    router.post('/login', [AuthController, 'logIn']).as('user.login')
    router.post('/register', [AuthController, 'register']).as('user.register')
    router.post('/logout', [AuthController, 'logOut']).as('auth.logout')
}).prefix('/auth')

router.group(() => {
    router.get('/users', [AuthController, 'allusers']).as('user.all')
    router.get('/tweets', [TweetsController, 'allTweets']).as('tweets.all')
}).prefix('api')