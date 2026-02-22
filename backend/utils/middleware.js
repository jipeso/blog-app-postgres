import jwt from 'jsonwebtoken'

import { Session } from '../models/index.js'
import { SECRET } from '../utils/config.js'
import logger from './logger.js'

export const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return response
      .status(400)
      .json({ error: 'username must be unique' })
  }

  next(error)
}

export const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    try {
      const token = authorization.substring(7)
      req.decodedToken = jwt.verify(token, SECRET)

      const session = await Session.findOne({
        where: { token },
      })

      if (!session) {
        return res.status(401).json({ error: 'session expired' })
      }
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
