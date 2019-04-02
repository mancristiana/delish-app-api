const express = require('express');
const router = express.Router();

const ingredients = require('./ingredients');
const recipes = require('./recipes');

router
  .route('/api/ingredients')
  .get(ingredients.getAll)
  .post(ingredients.add);

router
  .route('/api/ingredients/:id')
  .get(ingredients.getById)
  .put(ingredients.update)
  .delete(ingredients.delete);

router
  .route('/api/recipes')
  .get(recipes.getAll)
  .post(recipes.add);

router
  .route('/api/recipes/:id')
  .get(recipes.getById)
  .patch(recipes.update)
  .delete(recipes.delete);

// Use middleware which serves files from given 'public' directory
router.use(express.static('./public'));

module.exports = router;
