import { validateAdmin, validatePartialAdmin } from '../schemas/admins.js'

export class AdminController {
  constructor({ adminModel }) {
    this.adminModel = adminModel
  }

  getAllAdmin = async (req, res) => {
    const resAdmin = await this.adminModel.getAllAdmin({})
    res.json(resAdmin)
  }

  createAdmin = async (req, res) => {
    const result = validateAdmin(req.body)

    await this.adminModel.createAdmin({
      input: result.data,
    })
    res.status(201).json({ message: 'Administrador creado' })
  }

  updateAdminById = async (req, res) => {
    const result = validatePartialAdmin(req.body)
    const { id } = req.params

    try {
      await this.adminModel.updateAdminById({
        id,
        input: result.data,
      })
      return res.status(200).json({ message: 'Administrador actualizado' })
    } catch (e) {
      if (e.message === 'Error al modificar administrador') {
        res.status(404).json({ message: 'Error al modificar administrador' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }

  deleteAdminById = async (req, res) => {
    const { id } = req.params

    try {
      await this.adminModel.deleteAdminById({
        id,
      })
      return res.status(200).json({ message: 'Administrador deshabilitado' })
    } catch (e) {
      if (e.message === 'Administrador no encontrado') {
        res.status(404).json({ message: 'Administrador no encontrado' })
      } else {
        res.status(500).json({ message: 'Error interno del servidor' })
      }
    }
  }

  adminLogin = async (req, res) => {
    try {
      const { username, password } = req.body
      const result = await this.adminModel.adminLogin({ username, password })

      res.json(result)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      res.status(500).json({ error: 'Error al iniciar sesión' })
    }
  }
}
