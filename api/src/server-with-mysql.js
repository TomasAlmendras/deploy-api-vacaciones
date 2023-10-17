import { createApp } from './app.js'

import { VacationModel } from './models/mysql/vacations.js'
import { AdminModel } from './models/mysql/admins.js'
import { EmployeeModel } from './models/mysql/employees.js'

createApp({
  vacationModel: VacationModel,
  adminModel: AdminModel,
  employeeModel: EmployeeModel,
})
