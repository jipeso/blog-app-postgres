import Router from 'express'

import { sequelize } from '../utils/db.js'
const router = Router()

router.post('/', async (req, res) => {
  await sequelize.truncate({ cascade: true })
  res.status(204).end()
})

export default router
