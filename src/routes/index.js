const express = require('express');
const router = express.Router();

const RecipesController = require('./recipes-controller');
const AuthController = require('./auth-controller');
const auth = AuthController.authorize;

router.route('/auth').post(AuthController.login);

router
  .route('/api/users')
  .post(UsersController.createUser)
  .get(auth, UsersController.getUser)
  .put(auth, UsersController.updateUser)
  .delete(auth, UsersController.deleteUser);

router
  .route('/api/recipes')
  .get(auth, RecipesController.getAll)
  .post(auth, RecipesController.add);

router
  .route('/api/recipes/:id')
  .get(auth, RecipesController.getById)
  .patch(auth, RecipesController.update)
  .delete(auth, RecipesController.delete);

// Use middleware which serves files from given 'public' directory
router.use(express.static('./public'));

module.exports = router;
