import { Router } from 'express'
import { VacationController } from '../controllers/vacations.js'

export const createVacationRouter = ({ vacationModel }) => {
  const vacationsRouter = Router()

  const vacationController = new VacationController({ vacationModel })

  vacationsRouter.get('/', vacationController.getAllVacation)
  vacationsRouter.post('/', vacationController.createVacation)
  vacationsRouter.patch('/:id', vacationController.updateVacationById)

  return vacationsRouter
}
