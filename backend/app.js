import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import blogsRouter from './controllers/blogs.js'
import { errorHandler } from './utils/middleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

export default app
