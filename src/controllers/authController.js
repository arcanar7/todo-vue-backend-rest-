const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const config = require('../config')

exports.auth_register = async (req, res) => {
  try {
    const message = 'Такой пользователь уже существует'
    const { email, password } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      password: hashPassword,
      todos: [],
    })
    await user.save()
    return res.status(201).json({ user })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.auth_login = async (req, res) => {
  const message =
    'Пользователь с такой электронной почтой или паролем не найден'
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })
    if (!candidate) {
      return res.status(400).json({ message })
    }
    const isMatch = await bcrypt.compare(password, candidate.password)
    if (!isMatch) {
      return res.status(400).json({ message })
    }
    const token = jwt.sign({ userId: candidate._id }, config.JWT_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(
      { userId: candidate._id },
      config.REFRESH_SECRET,
      {
        expiresIn: '60d',
      }
    )

    jwt.verify(refreshToken, config.REFRESH_SECRET, (err, data) => {
      console.log(data.exp)
    })

    return res.status(200).json({ token, refreshToken, uid: candidate._id })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.auth_token = (req, res) => {
  const { refreshToken } = req.body
  let decoded
  try {
    decoded = jwt.verify(refreshToken, config.REFRESH_SECRET)
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' })
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token!' })
    }
  }
  const newToken = jwt.sign({ userId: decoded.userId }, config.JWT_SECRET, {
    expiresIn: '30m',
  })
  const newRefreshToken = jwt.sign(
    { userId: decoded.userId },
    config.REFRESH_SECRET,
    {
      expiresIn: '60d',
    }
  )
  return res.status(200).json({ newToken, newRefreshToken })
}
