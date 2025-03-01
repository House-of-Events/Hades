import knex from 'knex';
import knexConfig from '../../knexfile';

// get the environment from the environment variable stored in .env.development.local file
const environment = process.env.APP_ENV;
console.log('Got environment: ', environment, 'and', process.env.APP_ENV);
let config = knexConfig[environment];

config = {
  ...config,
  cliet: 'pg',
};

const db = knex(config);

export { db };
