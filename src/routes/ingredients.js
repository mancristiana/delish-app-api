const Ingredient = require('./../models').Ingredient;

/**
 * @api {get} /ingredients Get All Ingredients
 * @apiName get-all-ingredients
 * @apiGroup Ingredients
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns a list of all ingredients.
 *
 * @apiSuccess (Success 2xx) 200 OK
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

// Handler function (middleware system) for get request
module.exports.getAll = async function(req, res) {
  let error, ingredients;
  [ingredients, error] = await to(Ingredient.find());
  if (error) {
    return responseError(res, error);
  }

  return responseSuccess(res, ingredients);
};

/**
 * @api {post} /ingredients Add Ingredient
 * @apiName add-ingredient
 * @apiGroup Ingredients
 * @apiVersion 1.0.0
 *
 * @apiDescription This request creates a new ingredient using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned
 *
 * @apiParam (Requested Fields) {String} name Name of the ingredient.
 * @apiParam (Requested Fields) {String} image URL of the ingredient.
 *
 * @apiParamExample {json} Post Example:
 *   {
 *       "name": "Olive Oil",
 *       "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/olive-oil.jpg"
 *   }
 *
 * @apiSuccess (Success 2xx) 201 Ingredient Created
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     Location : /<ObjectId>
 *     {
 *       "_id" : "5746d36bfa2cdf7c300bf61c",
 *       "message": "Ingredient added"
 *     }
 *
 * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *       "error": "Internal Server Error"
 *   }
 *
 */

module.exports.add = async function(req, res) {
  let result, error;
  const newIngredient = new Ingredient(req.body);
  [result, error] = await to(newIngredient.save());
  if (error) {
    if (error.type === 'ValidationError') {
      return responseError(res, error, 400);
    }
    return responseError(res, error);
  }
  return responseSuccess(res, { id: result.id }, 201);
};

/**
 * @api {get} /ingredients/id Get Ingredient
 * @apiName get-ingredient
 * @apiGroup Ingredients
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns the ingredient specified by the unique ID in the request URL
 *
 * @apiParam {ObjectId} id The unique identifier of the ingredient.
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "_id": "573ec098e85f5601f611322b",
 *       "name": "Cherry Tomato",
 *       "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg"
 *   }
 *
 * @apiError 404 Ingredient Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getById = async function(req, res) {
  let ingredient, error;
  [ingredient, error] = await to(Ingredient.findById(req.params.id));
  if (error) {
    return responseError(res, error);
  }

  if (!ingredient) {
    return responseError(res, { message: 'Ingredient not found' }, 404);
  }

  return responseSuccess(res, ingredient);
};

/**
 * @api {put} /ingredients/id Update Ingredient
 * @apiName update-ingredient
 * @apiGroup Ingredients
 * @apiVersion 1.0.0
 *
 * @apiDescription This request updates an existing ingredient using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.
 *
 * @apiParam {ObjectId} id The unique identifier of the ingredient.
 * @apiParamExample {json} Edit Example:
 *   {
 *       "name": "Cherry Tomato",
 *       "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg"
 *   }
 *
 * @apiSuccess (Success 2xx) 201 Ingredient Edited
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     Location : /api/ingredients/<ObjectId>
 *     {
 *       "message": "Ingredient edited"
 *     }
 *
 * @apiError (Error 4xx) 404 Ingredient not Found
 * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.update = async function(req, res) {
  let result, error;
  [result, error] = await to(
    Ingredient.update({ _id: req.params.id }, { $set: req.body })
  );

  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'Ingredient not found' }, 404);
  }

  return responseSuccess(res);
};

/**
 * @api {delete} /ingredients/id Delete Ingredient
 * @apiName delete-ingredient
 * @apiGroup Ingredients
 * @apiVersion 1.0.0
 *
 * @apiDescription This request deletes an existing ingredient with the _id parameter specified in the request URL.
 * @apiParam {ObjectId} id The unique identifier of the ingredient.
 *
 * @apiSuccess (Success 2xx) 200 Successful Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 204 No Content
 *      {
 *          "message" : "Ingredient deleted"
 *      }
 *
 * @apiError 404 Ingredient Not Found
 * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.delete = async function(req, res) {
  let result, error;
  [result, error] = await to(Ingredient.deleteOne({ _id: req.params.id }));
  if (error) {
    return responseError(res, error);
  }
  if (result.n === 0) {
    return responseError(res, { message: 'Ingredient not found' }, 404);
  }

  return responseSuccess(res);
};
