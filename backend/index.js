import app from './app.js'
import logger from './utils/logger.js'
import { PORT } from './utils/config.js'
import { connectToDatabase } from './utils/db.js'

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()
