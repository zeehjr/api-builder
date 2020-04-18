import express from 'express'
import dynamicRouter from './api/middlewares/dynamicRouter'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(dynamicRouter)

export default app
