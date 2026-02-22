import Router from 'express'

import { Session } from '../models/index.js'
import { tokenExtractor } from '../utils/middleware.js'

const router = Router()

router.delete('/', tokenExtractor, async (req, res) => {
  const token = req.get('authorization').substring(7)
  await Session.destroy({
    where: { token },
  })
  res.status(204).end()
})

export default router
