const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')

const PORT = process.env.PORT || config.port
const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/todo', todoRoutes)
app.use('/auth', authRoutes)

mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log('Mongoose - successful connection ...')
    app.listen(PORT, () => console.log(`Server start on port ${PORT} ...`))
  })
  .on('error', error => console.warn(error))
