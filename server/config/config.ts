const dotenv = require('dotenv')
dotenv.config();


const {
  DB_HOST,
  DB_PORT,
  MONGO_INITDB_ROOT_USERNAME: DB_USER,
  MONGO_INITDB_ROOT_PASSWORD: DB_PASSWORD,
} = process.env;

const config = {
  database_user: DB_USER,
  database_password: DB_PASSWORD,
  database_host: DB_HOST,
  database_port: DB_PORT,
  database_uri: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
  // database_uri: `mongodb://${DB_HOST}:${DB_PORT}`
}

export default config
