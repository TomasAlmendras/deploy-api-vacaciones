import {
  validateVacation,
  validatePartialVacation,
} from '../schemas/vacations.js'

export class VacationController {
  constructor({ vacationModel }) {
    this.vacationModel = vacationModel
  }

  getAllVacation = async (req, res) => {
    const resVacation = await this.vacationModel.getAllVacation({})
    res.json(resVacation)
  }

  createVacation = async (req, res) => {
    const input = req.body
    input.fechaInicio = new Date(input.fechaInicio)
    input.fechaFin = new Date(input.fechaFin)

    try {
      const result = validateVacation(input)

      await this.vacationModel.createVacation({
        input: result.data,
      })
      return res.status(201).json({ message: 'Vacaciones creadas' })
    } catch (e) {
      if (e.message === 'Error al crear las vacaciones') {
        res.status(404).json({ message: 'Error al crear vacaciones' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }

  updateVacationById = async (req, res) => {
    const result = validatePartialVacation(req.body)
    const { id } = req.params

    try {
      await this.vacationModel.updateVacationById({
        id,
        input: result.data,
      })
      return res.status(200).json({ message: 'Vacaciones actualizadas' })
    } catch (e) {
      if (e.message === e) {
        res.status(404).json({ message: 'Error al modificar vacaciones' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }
}
