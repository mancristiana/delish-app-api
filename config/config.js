CONFIG = {}; //Make this global to use all over the application

function conf(key, defaultValue) {
  CONFIG[key] = process.env[key] || defaultValue;
  if (!CONFIG[key]) {
    throwError(
      `${key} is not defined. Please add ${key}=[value] to the .env file in the root of this project.`,
      true
    );
  }
}

conf('AWS_ACCESS_KEY_ID');
conf('AWS_SECRET_ACCESS_KEY');
conf('S3_BUCKET');
conf('PORT', 5000);
conf('MONGODB_URI');
conf('MONGODB_DB');
