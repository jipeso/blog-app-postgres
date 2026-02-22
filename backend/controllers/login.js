import jwt from 'jsonwebtoken'
import Router from 'express'

import { SECRET } from '../utils/config.js'
import { User, Session } from '../models/index.js'

const router = Router()

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account is disabled',
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({ userId: user.id, token })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default router
