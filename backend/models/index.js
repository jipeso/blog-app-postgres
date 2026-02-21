import Blog from './blog.js'
import User from './user.js'
import ReadingList from './readingList.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_marked' })

export { Blog, User, ReadingList }
