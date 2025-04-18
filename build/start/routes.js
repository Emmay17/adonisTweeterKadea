import router from '@adonisjs/core/services/router';
import PostsController from '../app/controllers/posts_controller.js';
import PermissionsController from '#controllers/permissions_controller';
import AuthController from '#controllers/auth_controller';
import { middleware } from './kernel.js';
import TweetsController from '#controllers/tweets_controller';
router.get('/dashboard', [PostsController, 'getPosts']).as('dashboard.login').use(middleware.nonPublic());
router.group(() => {
    router.post('/saveDB', [PostsController, 'saveOnDatabase']).as('poste.createDB');
}).prefix('/posts');
router.group(() => {
    router.get('/', [PermissionsController, 'pagePermission']);
    router.post('/register', [PermissionsController, 'createPermission']).as('permissions.create');
}).prefix('/permissions');
router.group(() => {
    router.get('/', [AuthController, 'show']);
    router.post('/login', [AuthController, 'logIn']).as('user.login');
    router.post('/register', [AuthController, 'register']).as('user.register');
    router.post('/logout', [AuthController, 'logOut']).as('auth.logout');
}).prefix('/auth');
router.group(() => {
    router.get('/users', [AuthController, 'allusers']).as('user.all');
    router.get('/tweets', [TweetsController, 'allTweets']).as('tweets.all');
}).prefix('api');
//# sourceMappingURL=routes.js.map