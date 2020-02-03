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

    const { newAccessToken, newRefreshToken, expDate } = getNewTokens(
      candidate._id
    )

    candidate.refreshToken = newRefreshToken
    await candidate.save()

    return res
      .status(200)
      .json({ newAccessToken, newRefreshToken, expDate, uid: candidate._id })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.auth_token = async (req, res) => {
  const { refreshToken } = req.body
  try {
    const decoded = jwt.verify(refreshToken, config.REFRESH_SECRET)
    const candidate = await User.findOne({ _id: decoded.userId })

    console.log(candidate)
    console.log(refreshToken)

    if (candidate.refreshToken !== refreshToken) {
      return res.status(400).json({ message: 'Invalid token! !==' })
    }

    const { newAccessToken, newRefreshToken, expDate } = getNewTokens(
      candidate._id
    )

    candidate.refreshToken = newRefreshToken
    await candidate.save()

    return res.status(200).json({ newAccessToken, newRefreshToken, expDate })
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' })
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token!' })
    } else {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

function getNewTokens(userId) {
  const newAccessToken = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: '10s',
  })
  const newRefreshToken = jwt.sign({ userId }, config.REFRESH_SECRET, {
    expiresIn: '60d',
  })
  const expDate = jwt.verify(newAccessToken, config.JWT_SECRET).exp
  return { newAccessToken, newRefreshToken, expDate }
}
