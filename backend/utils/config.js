export const PORT = process.env.PORT || 3000

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD

export const DATABASE_URL = `postgres://postgres:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/postgres`

export const SECRET = process.env.SECRET
