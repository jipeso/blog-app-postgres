import Router from 'express'

import { Blog, User } from '../models/index.js'
const router = Router()

router.get('/reset', async (req, res) => {
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })
  res.status(204).end()
})

export default router
