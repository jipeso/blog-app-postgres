import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

import { DATABASE_URL } from './config.js'

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
})

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({
      sequelize,
      tableName: 'migrations',
    }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })

  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to database successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
