const Recipe = require('./../models').Recipe;

/**
 * @api {get} /recipes Get All Recipes
 * @apiName get-all-recipes
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns a list of all recipes.
 *
 * @apiSuccess (Success 2xx) 200 OK
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

// Handler function (middleware system) for get request
module.exports.getAll = async function(req, res) {
  let recipes, error;
  [recipes, error] = await to(Recipe.find());
  if (error) {
    return responseError(res, error);
  }

  return responseSuccess(res, recipes);
};

/**
 * @api {post} /recipes Add Recipe
 * @apiName add-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request creates a new recipe using the json body provided. An id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated id is returned
 *
 * @apiParam (Recipe Fields) {String} title Name of the recipe.
 * @apiParam (Recipe Fields) {String} image URL of the recipe.
 * @apiParam (Recipe Fields) {number} time Preparation time represented in number of minutes.
 * @apiParam (Recipe Fields) {number} servings Number of serving produced with the recipe.
 * @apiParam (Recipe Fields) {String} link Optional URL link to the website where the recipe was found.
 * @apiParam (Recipe Fields) {Object[]} ingredients List of ingredients needed for the recipe.
 * @apiParam (Recipe Fields) {String} ingredient.name Name of the ingredient.
 * @apiParam (Recipe Fields) {Quantity} ingredient.quantity Number representing the quantity of the ingredient.
 * @apiParam (Recipe Fields) {String} ingredient.unit Measurement such as grams, cups, teaspoons, etc.
 * @apiParam (Recipe Fields) {String[]} directions List of steps describing how to cook the recipe.
 *
 * @apiParamExample {json} Post Example:
 *       {
 *          "title": "Tomato Soup",
 *          "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/recipes/573ec098e85f5601f611322b.jpg",
 *          "time": 35,
 *          "servings": 6,
 *          "link": "https://www.allrecipes.com/recipe/39544/garden-fresh-tomato-soup/",
 *          "ingredients":
 *          [
 *              {
 *                  "name": "Tomato",
 *                  "quantity": 4,
 *                  "unit": "cups"
 *              },
 *              {
 *                  "name": "Onion",
 *                  "quantity": 1,
 *                  "unit": "whole"
 *              },
 *              {
 *                  "name": "Clove",
 *                  "quantity": 4,
 *                  "unit": "whole"
 *              },
 *              {
 *                  "name": "Butter",
 *                  "quantity": 2,
 *                  "unit": "tablespoons"
 *              },
 *              {
 *                  "name": "Chicken Broth",
 *                  "quantity": 2,
 *                  "unit": "cups"
 *              },
 *              {
 *                  "name": "Salt",
 *                  "quantity": 1,
 *                  "unit": "tablespoon"
 *              }
 *          ],
 *          "instructions":
 *          [
 *              "In a stockpot, over medium heat, combine the tomatoes, onion, cloves and chicken broth. Bring to a boil, and gently boil for about 20 minutes to blend all of the flavors. Remove from heat and run the mixture through a food mill into a large bowl, or pan. Discard any stuff left over in the food mill.",
 *              "In the now empty stockpot, melt the butter over medium heat. Stir in the flour to make a roux, cooking until the roux is a medium brown. Gradually whisk in a bit of the tomato mixture, so that no lumps form, then stir in the rest. Season with sugar and salt, and adjust to taste."
 *          ]
 *       }
 *
 * @apiSuccess (Success 2xx) 201 Recipe Created
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *    "data":
 *    {
 *       "id" : "5746d36bfa2cdf7c300bf61c"
 *    }
 *    "message": "Recipe added"
 * }
 *
 * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.add = async function(req, res) {
  let result, error;
  const newRecipe = new Recipe(req.body);
  [result, error] = await to(newRecipe.save());
  if (error) {
    if (error.type === 'ValidationError') {
      return responseError(res, error, 400);
    }
    return responseError(res, error);
  }

  return responseSuccess(res, { id: result.id }, 201);
};

/**
 * @api {get} /recipes/:id Get Recipe
 * @apiName get-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns the recipe specified by the unique <code>:id</code> in the request URL
 *
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiError 404 Recipe Not Found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getById = async function(req, res) {
  let recipe, error;
  [recipe, error] = await to(Recipe.findOne({ _id: req.params.id }));
  if (error) {
    return responseError(res, error);
  }

  if (!recipe) {
    return responseError(res, { message: 'Recipe not found' }, 404);
  }

  return responseSuccess(res, recipe);
};

/**
 * @api {patch} /recipes/:id Update Recipe
 * @apiName update-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request updates an existing recipe using the json body provided and the <code>:id</code> parameter specified in the request URL. For consistency the json may include keys like in the example below.
 *
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 * @apiParamExample {json} Edit Example:
 * {
 *    "title": "Cherry Tomato Soup",
 *    "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg"
 * }
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiError (Error 4xx) 404 Recipe not found
 * @apiError (Error 5xx) 500 Internal server error
 *
 */
module.exports.update = async function(req, res) {
  let result, error;
  [result, error] = await to(
    Recipe.update({ _id: req.params.id }, { $set: req.body })
  );
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'Recipe not found' }, 404);
  }

  return responseSuccess(res);
};

/**
 * @api {delete} /recipes/:id Delete Recipe
 * @apiName delete-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request deletes an existing recipe with the <code>:id</code> parameter specified in the request URL.
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 *
 * @apiSuccess (Success 2xx) 200 Successful Request
 * @apiError (Error 4xx) 404 Recipe not found
 * @apiError (Error 5xx) 500 Internal server error
 *
 */
module.exports.delete = async function(req, res) {
  let error, result;
  [result, error] = await to(Recipe.deleteOne({ _id: req.params.id }));
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'Recipe not found' }, 404);
  }

  return responseSuccess(res);
};
