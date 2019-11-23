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
conf('DB_URI');
conf('DB');

conf('ARGON_TIMECOST', 40)
conf('ARGON_MEMORY', 128000)
conf('ARGON_PARALLELISM', 4)

conf('JWT_ENCRYPTION', 'HS512')
conf('JWT_EXPIRATION', 10000)
conf('JWT_SECRET')