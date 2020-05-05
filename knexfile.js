// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'admin',
      database : 'learnPostgres'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
  },
};
