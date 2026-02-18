import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import { errorHandler } from './utils/middleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

export default app
