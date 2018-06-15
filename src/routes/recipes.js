// Require mongodb module
var MongoClient = require('mongodb').MongoClient; // instance needed for connecting to db
var ObjectID = require('mongodb').ObjectID;

// Connection URL
var url = process.env.MONGODB_URI;
var db = process.env.MONGODB_DB;

var errorHandler = require('./../utils/error-handler').errorHandler;

/**
 * @api {get} /recipes Get All Recipes
 * @apiName get-all-recipes
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns a list of all recipes.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

// Handler function (middleware system) for get request
module.exports.getAll = function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (errorHandler(res, err)) return;
      var db = client.db(db);
      var collection = db.collection('recipes');
      collection.find().toArray(function(err, result) {
        if (errorHandler(res, err)) return;
        res.status(200);
        res.json(result);

        client.close();
      });
    }
  );
};

/**
 * @api {post} /recipes Add Recipe
 * @apiName add-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request creates a new recipe using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned
 *
 * @apiParam (Recipe Fields) {String} name Name of the recipe.
 * @apiParam (Recipe Fields) {String} image URL of the recipe.
 * @apiParam (Recipe Fields) {number} time Preparation time represented in number of minutes.
 * @apiParam (Recipe Fields) {number} servings Number of serving produced with the recipe.
 * @apiParam (Recipe Fields) {String} link Optional URL link to the website where the recipe was found.
 * @apiParam (Recipe Fields) {String[]} instructions List of steps describing how to cook the recipe.
 * @apiParam (Recipe Fields) {Object[]} ingredients List of ingredients needed for the recipe.
 * @apiParam (Recipe Fields) {String} ingredient.name Name of the ingredient.
 * @apiParam (Recipe Fields) {Quantity} ingredient.quantity Number representing the quantity of the ingredient.
 * @apiParam (Recipe Fields) {String} ingredient.measurement Measurement such as grams, cups, teaspoons, etc.
 *
 * @apiParamExample {json} Post Example:
 *       {
 *          "name": "Tomato Soup",
 *          "description": "A quick and easy recipe for real homemade tomato soup like no other you've had before.",
 *          "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/recipes/573ec098e85f5601f611322b.jpg",
 *          "time": 35,
 *          "servings": 6,
 *          "link": "https://www.allrecipes.com/recipe/39544/garden-fresh-tomato-soup/",
 *          "ingredients":
 *          [
 *              {
 *                  "name": "Tomato",
 *                  "quantity": 4,
 *                  "measurement": "cups"
 *              },
 *              {
 *                  "name": "Onion",
 *                  "quantity": 1,
 *                  "measurement": "whole"
 *              },
 *              {
 *                  "name": "Clove",
 *                  "quantity": 4,
 *                  "measurement": "whole"
 *              },
 *              {
 *                  "name": "Butter",
 *                  "quantity": 2,
 *                  "measurement": "tablespoons"
 *              },
 *              {
 *                  "name": "Chicken Broth",
 *                  "quantity": 2,
 *                  "measurement": "cups"
 *              },
 *              {
 *                  "name": "Salt",
 *                  "quantity": 1,
 *                  "measurement": "tablespoon"
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
 *     HTTP/1.1 201 Created
 *     Location : /<ObjectId>
 *     {
 *       "_id" : "5746d36bfa2cdf7c300bf61c",
 *       "message": "Recipe added"
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

module.exports.add = function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (errorHandler(res, err)) return;
      var db = client.db(db);
      var collection = db.collection('recipes');
      collection.insertOne(req.body, function(err, result) {
        if (errorHandler(res, err)) return;
        res.status(201);
        res.location('/' + result.insertedId.toHexString());
        res.json({
          _id: result.insertedId.toHexString(),
          message: 'Recipe added'
        });

        client.close();
      });
    }
  );
};

/**
 * @api {get} /recipes/id Get Recipe
 * @apiName get-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns the recipe specified by the unique ID in the request URL
 *
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 *
 * @apiSuccess (Success 2xx) 200 OK
 *
 * @apiError 404 Recipe Not Found
 * @apiError 400 Bad Request <br>Wrongly formated <code>id</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getById = function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (errorHandler(res, err)) return;
      var db = client.db(db);
      var collection = db.collection('recipes');
      try {
        collection.findOne({ _id: ObjectID(req.params.id) }, function(
          err,
          result
        ) {
          if (errorHandler(res, err)) return;
          if (result === null) {
            res.status(404).send({ error: 'Exercise Not Found' });
          } else {
            res.status(200);
            res.json(result);
          }
          client.close();
        });
      } catch (e) {
        res.status(400).send({ error: 'Bad Request' });
        client.close();
      }
    }
  );
};

/**
 * @api {put} /recipes/id Update Recipe
 * @apiName update-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request updates an existing recipe using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.
 *
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 * @apiParamExample {json} Edit Example:
 *   {
 *       "name": "Cherry Tomato Soup",
 *       "image": "https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg"
 *   }
 *
 * @apiSuccess (Success 2xx) 201 Recipe Edited
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     Location : /api/recipes/<ObjectId>
 *     {
 *       "message": "Recipe edited"
 *     }
 *
 * @apiError (Error 4xx) 404 Recipe not Found
 * @apiError (Error 4xx) 400 Bad Request <br>Wrongly formated <code>json</code> was sent.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.update = function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (errorHandler(res, err)) return;
      var db = client.db(db);
      var collection = db.collection('recipes');

      try {
        collection.update(
          { _id: ObjectID(req.params.id) },
          { $set: req.body },
          function(err, result) {
            if (errorHandler(res, err)) return;
            res.status(201).send({ message: 'Recipe edited' });
            client.close();
          }
        );
      } catch (e) {
        res.status(400).send({ error: 'Bad Request' });
        client.close();
      }
    }
  );
};

/**
 * @api {delete} /recipes/id Delete Recipe
 * @apiName delete-recipe
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 * @apiDescription This request deletes an existing recipe with the _id parameter specified in the request URL.
 * @apiParam {ObjectId} id The unique identifier of the recipe.
 *
 * @apiSuccess (Success 2xx) 200 Successful Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 204 No Content
 *      {
 *          "message" : "Recipe deleted"
 *      }
 *
 * @apiError 404 Recipe Not Found
 * @apiError 400 Bad Request <br>A wrong formated <code>id</code> was sent
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.delete = function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (errorHandler(res, err)) return;
      var db = client.db(db);
      var collection = db.collection('recipes');

      try {
        collection.remove({ _id: ObjectID(req.params.id) }, function(
          err,
          result
        ) {
          if (errorHandler(res, err)) return;
          res.status(200);
          res.json({
            _id: req.params.id,
            message: 'Recipe deleted'
          });

          client.close();
        });
      } catch (e) {
        res.status(400).send({ error: 'Bad Request' });
        client.close();
      }
    }
  );
};
