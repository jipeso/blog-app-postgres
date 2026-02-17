import { QueryTypes } from 'sequelize'
import { sequelize } from './utils/db.js'

const main = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    })

    blogs.forEach((blog) => {
      console.log(
        `${blog.author}: ${blog.title}, ${blog.likes} likes`
      )
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

main()
