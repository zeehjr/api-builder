import { connect, connection } from 'mongoose'

const DB_HOST = process.env.DB_HOST ?? 'localhost'
const DB_USER = process.env.DB_USER ?? 'zeeh'
const DB_PASS = process.env.DB_PASS ?? 'securepw'

connect(`mongodb://${DB_HOST}:27017`, { user: DB_USER, pass: DB_PASS })

const database = connection

export default database
