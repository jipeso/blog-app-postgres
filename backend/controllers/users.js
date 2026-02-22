import Router from 'express'

import { User, Blog } from '../models/index.js'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === 'true'
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['read', 'id'],
          where,
        },
      },
    ],
  })

  if (user) {
    res.json({
      username: user.username,
      name: user.name,
      readings: user.readings.map((blog) => {
        const { reading_list, ...blogData } = blog.toJSON()
        return {
          ...blogData,
          readingLists: [reading_list],
        }
      }),
    })
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  })

  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

export default router
