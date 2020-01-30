module.exports = {
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
}
