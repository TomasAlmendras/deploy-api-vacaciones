import {
  validateEmployee,
  validatePartialEmployee,
} from '../schemas/employees.js'

export class EmployeeController {
  constructor({ employeeModel }) {
    this.employeeModel = employeeModel
  }

  getAllEmployee = async (req, res) => {
    const resEmployee = await this.employeeModel.getAllEmployee({})
    res.json(resEmployee)
  }

  createEmployee = async (req, res) => {
    const input = req.body
    input.fechaNacimiento = new Date(input.fechaNacimiento)
    input.fechaIngreso = new Date(input.fechaIngreso)
    const result = validateEmployee(input)

    await this.employeeModel.createEmployee({
      input: result.data,
    })
    return res.status(200).json({ message: 'Empleado creado' })
  }

  updateEmployeeById = async (req, res) => {
    const result = validatePartialEmployee(req.body)
    const { id } = req.params

    try {
      await this.employeeModel.updateEmployeeById({
        id,
        input: result.data,
      })
      return res.status(200).json({ message: 'Empleado actualizado' })
    } catch (e) {
      if (e.message === 'Error al modificar empleado') {
        res.status(404).json({ message: 'Error al modificar empleado' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }

  deleteEmployeeById = async (req, res) => {
    const { id } = req.params

    try {
      await this.employeeModel.deleteEmployeeById({ id })
      return res.status(200).json({ message: 'Empleado deshabilitado' })
    } catch (e) {
      if (e.message === 'Empleado no encontrado') {
        res.status(404).json({ message: 'Empleado no encontrado' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }
}
