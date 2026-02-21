import Router from 'express'

import { Blog, User, ReadingList } from '../models/index.js'
const router = Router()

router.post('/', async (req, res) => {
  req.blog = await Blog.findByPk(req.body.blogId)
  if (!req.blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  req.user = await User.findByPk(req.body.userId)
  if (!req.user) {
    return res.status(404).json({ error: 'user not found' })
  }

  const readingListEntry = await ReadingList.create({
    userId: req.user.id,
    blogId: req.blog.id,
  })

  res.status(201).json(readingListEntry)
})

export default router
