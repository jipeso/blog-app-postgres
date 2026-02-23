import Router from 'express'

import { Blog, User, ReadingList } from '../models/index.js'
import { tokenExtractor } from '../utils/middleware.js'
const router = Router()

router.post('/', async (req, res) => {
  if (!req.body.blogId) {
    return res.status(400).json({ error: 'blogId is required' })
  }
  if (!req.body.userId) {
    return res.status(400).json({ error: 'userId is required' })
  }

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

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingListEntry = await ReadingList.findByPk(req.params.id)
  if (!readingListEntry) {
    return res.status(404).json({ error: 'entry not found' })
  }

  if (req.decodedToken.id !== readingListEntry.userId) {
    return res.status(403).json({ error: 'user not authorized' })
  }

  readingListEntry.read = req.body.read
  await readingListEntry.save()
  res.json(readingListEntry)
})

export default router
