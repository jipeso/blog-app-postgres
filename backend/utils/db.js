import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

import { DATABASE_URL } from './config.js'

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
})

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations',
  }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
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

export const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}
