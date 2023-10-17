import express, { json } from 'express'
import { createVacationRouter } from './routes/vacations.js'
import { createAdminRouter } from './routes/admins.js'
import { createEmployeeRouter } from './routes/employees.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

export const createApp = ({ vacationModel, adminModel, employeeModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/admins', createAdminRouter({ adminModel }))
  app.use('/employees', createEmployeeRouter({ employeeModel }))
  app.use('/vacations', createVacationRouter({ vacationModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
