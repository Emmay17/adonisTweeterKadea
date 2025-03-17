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
// import Router from '@adonisjs/core/services/Route'


router.get('/dashboard', [PostsController, 'getPosts'])

router.group(() =>{
    router.post('/save', [PostsController, 'savePost']).as('poste.create')
}).prefix('/posts')

router.group(() => {
    router.get('/', [PermissionsController, 'pagePermission'])
    router.post('/register', [PermissionsController, 'createPermission']).as('permissions.create')
    // router.get('/getall',[PermissionsController, 'getallPermission']).as('permissions.getAll')
}).prefix('/permissions')