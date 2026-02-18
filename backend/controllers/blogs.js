import Router from 'express'
import { Blog, User } from '../models/index.js'
import { tokenExtractor } from '../utils/middleware.js'

const router = Router()

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  next()
}

const authorizeOwner = async (req, res, next) => {
  if (req.decodedToken.id !== req.blog.userId) {
    return res.status(403).json({ error: 'user not authorized' })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.decodedToken.id,
    date: new Date(),
  })
  res.status(201).json(blog)
})

router.delete(
  '/:id',
  tokenExtractor,
  blogFinder,
  authorizeOwner,
  async (req, res) => {
    await req.blog.destroy()
    res.status(204).end()
  }
)

router.put(
  '/:id',
  tokenExtractor,
  blogFinder,
  authorizeOwner,
  async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }
)

export default router
