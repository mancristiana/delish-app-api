const User = require('../models').User;

/**
 * @api {post} /users Register User
 * @apiName register-user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This request creates a new user on the patient platform.
 * By default the new user is assigned the patient role and all it's corresponding privileges.
 *
 * @apiParam {String} email         Unique Email used for logging into the account
 * @apiParam {String} password      Password used for logging into the account
 * @apiParam {String} name          Full name of the user
 *
 * @apiParamExample {json} Request body
 * {
 *     "email": "test@test.com",
 *     "password": "qwer1234",
 *     "name": "Test 4"
 * }
 *
 * @apiSuccess (Success 2xx) 200 User was successfully created
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true
 * }
 *
 * @apiError (Error 4xx) 409 Conflict
 * @apiError (Error 5xx) 500 Internal Server Error
 * @apiErrorExample (Error 4xx) 409 Conflict
 * {
 *     "success": false,
 *     "error": "Conflict registering new user. User email, phone and national Id must be unique"
 * }
 *
 */

module.exports.createUser = async function(req, res) {
  let error, user, response;
  const newUser = new User(req.body);
  [user, error] = await to(newUser.save());
  if (error) {
    if (error.type === 'ValidationError') {
      if (error.message.includes('unique')) {
        return responseError(
          res,
          {
            message:
              'Conflict registering new user. User email, phone and national Id must be unique'
          },
          409
        );
      }
      return responseError(res, error, 400);
    }
    return responseError(res, error);
  }

  return responseSuccess(res, null);
};

/**
 * @api {get} /users Get User
 * @apiName get-user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription An authorized user can view their own user information.
 * This request retrieves the user id from the authorization header and returns the corresponding user data.
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 *
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "name": "Cristiana Madnddn",
 *         "email": "test@test.com"
 *     }
 * }
 *
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 User was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getUser = async function(req, res) {
  let user = req.user;

  if (!user) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, user.getProfile());
};

/**
 * @api {post} /users Update User Profile
 * @apiName update-user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription An authorized user can modify their own user profile.
 * This request retrieves the user id from the authorization header and modifies the corresponding user data.
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 *
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiParamExample {json} Update account
 * {
 *     "email": "test@test.com",
 *     "password": "qwer1234",
 * }
 *
 * @apiParamExample {json} Update profile
 * {
 *     "name": "Test 4"
 * }
 *
 * @apiSuccess (Success 2xx) 200 User was successfully updated
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 User was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.updateUser = async function(req, res) {
  let error, result;
  [result, error] = await to(
    User.update({ _id: req.userId }, { $set: req.body })
  );
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, null);
};

/**
 * @api {delete} /users Delete User
 * @apiName delete-user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription An authorized user can delete their own user account.
 * This request retrieves the user id from the authorization header and deletes the corresponding user.
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 *
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccess (Success 2xx) 204 User was successfully deleted
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 User was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 */

module.exports.deleteUser = async function(req, res) {
  let error, result;
  [result, error] = await to(User.deleteOne({ _id: req.userId }));
  // User was not found
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, null, 204);
};
