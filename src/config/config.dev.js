module.exports = {
  port: 8081,
  dbURL: 'mongodb://localhost/vue-todo',
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  JWT_SECRET: 'some secret value 42',
  REFRESH_SECRET: 'refresh secret value 42',
}
