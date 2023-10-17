import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class AdminModel {
  static async getAllAdmin() {
    const [admins] = await connection.query(
      'CALL usp_ConsultarTodosLosAdministradores();',
    )
    return admins[0]
  }

  static async createAdmin({ input }) {
    const { nombre, apellido, usuario, clave, correo } = input
    try {
      await connection.query('CALL usp_AltaAdministrador(?,?,?,?,?);', [
        nombre,
        apellido,
        correo,
        usuario,
        clave,
      ])
    } catch (e) {
      throw new Error('Error al crear administrador')
    }
  }

  static async updateAdminById({ id, input }) {
    const { nombre, apellido, correo, estado } = input
    try {
      await connection.query('CALL usp_ModificarAdministrador(?,?,?,?,?);', [
        id,
        nombre,
        apellido,
        correo,
        estado,
      ])
    } catch (e) {
      throw new Error('Error al modificar administrador')
    }
  }

  static async deleteAdminById({ id }) {
    try {
      await connection.query('CALL usp_BajaAdministrador(?);', [id])
    } catch (e) {
      throw new Error('Administrador no encontrado')
    }
  }
}
