import Router from 'express'
import { fn, col } from 'sequelize'
import { Blog } from '../models/index.js'

const router = Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'blogs'],
      [fn('SUM', col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })

  res.json(authors)
})

export default router
