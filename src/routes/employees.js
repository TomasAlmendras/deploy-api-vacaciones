import { Router } from 'express'
import { EmployeeController } from '../controllers/employees.js'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeRouter = Router()

  const employeeController = new EmployeeController({ employeeModel })

  employeeRouter.get('/', employeeController.getAllEmployee)
  employeeRouter.post('/', employeeController.createEmployee)
  employeeRouter.delete('/:id', employeeController.deleteEmployeeById)
  employeeRouter.patch('/:id', employeeController.updateEmployeeById)

  return employeeRouter
}
