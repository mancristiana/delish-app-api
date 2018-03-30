define({ "api": [
  {
    "type": "post",
    "url": "/ingredients",
    "title": "Add Ingredient",
    "name": "add_ingredient",
    "group": "Ingredients",
    "version": "1.0.0",
    "description": "<p>This request creates a new ingredient using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned</p>",
    "parameter": {
      "fields": {
        "Requested Fields": [
          {
            "group": "Requested Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the ingredient.</p>"
          },
          {
            "group": "Requested Fields",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the ingredient.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post Example:",
          "content": "{\n    \"name\": \"Olive Oil\",\n    \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/olive-oil.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Ingredient Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nLocation : /<ObjectId>\n{\n  \"_id\" : \"5746d36bfa2cdf7c300bf61c\",\n  \"message\": \"Ingredient added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/ingredients.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "delete",
    "url": "/ingredients/id",
    "title": "Delete Ingredient",
    "name": "delete_ingredient",
    "group": "Ingredients",
    "version": "1.0.0",
    "description": "<p>This request deletes an existing ingredient with the _id parameter specified in the request URL.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the ingredient.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>Successful Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content\n{\n    \"message\" : \"Ingredient deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Ingredient Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/ingredients.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "get",
    "url": "/ingredients",
    "title": "Get All Ingredients",
    "name": "get_all_ingredients",
    "group": "Ingredients",
    "version": "1.0.0",
    "description": "<p>This request returns a list of all ingredients.</p>",
    "success": {
      "fields": {
        "Ingredient Fields": [
          {
            "group": "Ingredient Fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the ingredient.</p>"
          },
          {
            "group": "Ingredient Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the ingredient.</p>"
          },
          {
            "group": "Ingredient Fields",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the ingredient.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"573ec098e85f5601f611322b\",\n        \"name\": \"Tomato\",\n        \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/tomato.jpg\"\n    },\n    {\n        \"_id\": \"573ec075e85f5601f611322a\",\n        \"name\": \"Sugar\",\n        \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/sugar.jpg\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/ingredients.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "get",
    "url": "/ingredients/id",
    "title": "Get Ingredient",
    "name": "get_ingredient",
    "group": "Ingredients",
    "version": "1.0.0",
    "description": "<p>This request returns the ingredient specified by the unique ID in the request URL</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the ingredient.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"573ec098e85f5601f611322b\",\n    \"name\": \"Cherry Tomato\",\n    \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Ingredient Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>id</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/ingredients.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "put",
    "url": "/ingredients/id",
    "title": "Update Ingredient",
    "name": "update_ingredient",
    "group": "Ingredients",
    "version": "1.0.0",
    "description": "<p>This request updates an existing ingredient using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the ingredient.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Edit Example:",
          "content": "{\n    \"name\": \"Cherry Tomato\",\n    \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Ingredient Edited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nLocation : /api/ingredients/<ObjectId>\n{\n  \"message\": \"Ingredient edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Ingredient not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/ingredients.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "post",
    "url": "/recipes",
    "title": "Add Recipe",
    "name": "add_recipe",
    "group": "Recipes",
    "version": "1.0.0",
    "description": "<p>This request creates a new recipe using the json body provided. An _id field is generated automatically. For consistency the json should include the parameters specified below. A return Json prividing the generated _id is returned</p>",
    "parameter": {
      "fields": {
        "Recipe Fields": [
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Mongo generated id of the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "number",
            "optional": false,
            "field": "time",
            "description": "<p>Preparation time represented in number of minutes.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "number",
            "optional": false,
            "field": "servings",
            "description": "<p>Number of serving produced with the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Optional URL link to the website where the recipe was found.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String[]",
            "optional": false,
            "field": "instructions",
            "description": "<p>List of steps describing how to cook the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "Object[]",
            "optional": false,
            "field": "ingredients",
            "description": "<p>List of ingredients needed for the recipe.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "ingredient.name",
            "description": "<p>Name of the ingredient.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "Quantity",
            "optional": false,
            "field": "ingredient.quantity",
            "description": "<p>Number representing the quantity of the ingredient.</p>"
          },
          {
            "group": "Recipe Fields",
            "type": "String",
            "optional": false,
            "field": "ingredient.measurement",
            "description": "<p>Measurement such as grams, cups, teaspoons, etc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Post Example:",
          "content": "{\n   \"_id\": \"573ec098e85f5601f611322b\",\n   \"name\": \"Tomato Soup\",\n   \"description\": \"A quick and easy recipe for real homemade tomato soup like no other you've had before.\",\n   \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/recipes/573ec098e85f5601f611322b.jpg\",\n   \"time\": 35,\n   \"servings\": 6,\n   \"link\": \"https://www.allrecipes.com/recipe/39544/garden-fresh-tomato-soup/\",\n   \"ingredients\":\n   [\n       {\n           \"name\": \"Tomato\",\n           \"quantity\": 4,\n           \"measurement\": \"cups\"\n       },\n       {\n           \"name\": \"Onion\",\n           \"quantity\": 1,\n           \"measurement\": \"whole\"\n       },\n       {\n           \"name\": \"Clove\",\n           \"quantity\": 4,\n           \"measurement\": \"whole\"\n       },\n       {\n           \"name\": \"Butter\",\n           \"quantity\": 2,\n           \"measurement\": \"tablespoons\"\n       },\n       {\n           \"name\": \"Chicken Broth\",\n           \"quantity\": 2,\n           \"measurement\": \"cups\"\n       },\n       {\n           \"name\": \"Salt\",\n           \"quantity\": 1,\n           \"measurement\": \"tablespoon\"\n       }\n   ],\n   \"instructions\":\n   [\n       \"In a stockpot, over medium heat, combine the tomatoes, onion, cloves and chicken broth. Bring to a boil, and gently boil for about 20 minutes to blend all of the flavors. Remove from heat and run the mixture through a food mill into a large bowl, or pan. Discard any stuff left over in the food mill.\",\n       \"In the now empty stockpot, melt the butter over medium heat. Stir in the flour to make a roux, cooking until the roux is a medium brown. Gradually whisk in a bit of the tomato mixture, so that no lumps form, then stir in the rest. Season with sugar and salt, and adjust to taste.\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Recipe Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nLocation : /<ObjectId>\n{\n  \"_id\" : \"5746d36bfa2cdf7c300bf61c\",\n  \"message\": \"Recipe added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/recipes.js",
    "groupTitle": "Recipes"
  },
  {
    "type": "delete",
    "url": "/recipes/id",
    "title": "Delete Recipe",
    "name": "delete_recipe",
    "group": "Recipes",
    "version": "1.0.0",
    "description": "<p>This request deletes an existing recipe with the _id parameter specified in the request URL.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the recipe.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>Successful Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content\n{\n    \"message\" : \"Recipe deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Recipe Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>A wrong formated <code>id</code> was sent</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/recipes.js",
    "groupTitle": "Recipes"
  },
  {
    "type": "get",
    "url": "/recipes",
    "title": "Get All Recipes",
    "name": "get_all_recipes",
    "group": "Recipes",
    "version": "1.0.0",
    "description": "<p>This request returns a list of all recipes.</p>",
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/recipes.js",
    "groupTitle": "Recipes"
  },
  {
    "type": "get",
    "url": "/recipes/id",
    "title": "Get Recipe",
    "name": "get_recipe",
    "group": "Recipes",
    "version": "1.0.0",
    "description": "<p>This request returns the recipe specified by the unique ID in the request URL</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the recipe.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Recipe Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>id</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/recipes.js",
    "groupTitle": "Recipes"
  },
  {
    "type": "put",
    "url": "/recipes/id",
    "title": "Update Recipe",
    "name": "update_recipe",
    "group": "Recipes",
    "version": "1.0.0",
    "description": "<p>This request updates an existing recipe using the json body provided and the _id parameter specified in the request URL. For consistency the json may include keys like in the example below.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the recipe.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Edit Example:",
          "content": "{\n    \"name\": \"Cherry Tomato Soup\",\n    \"image\": \"https://s3.eu-central-1.amazonaws.com/delish-app-uploads/cherry-tomato.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>Recipe Edited</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nLocation : /api/recipes/<ObjectId>\n{\n  \"message\": \"Recipe edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Recipe not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request <br>Wrongly formated <code>json</code> was sent.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      }
    },
    "filename": "routes/recipes.js",
    "groupTitle": "Recipes"
  }
] });
