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

export class EmployeeModel {
  static async getAllEmployee({}) {
    const [employees] = await connection.query(
      'CALL usp_ConsultarTodosLosEmpleados();',
    )

    return employees[0]
  }

  static async createEmployee({ input }) {
    const {
      nombre,
      apellido,
      fechaNacimiento,
      documento,
      correo,
      direccion,
      fechaIngreso,
      departamento,
      puesto,
      usuario,
      clave,
    } = input

    try {
      await connection.query('CALL usp_AltaEmpleado(?,?,?,?,?,?,?,?,?,?,?);', [
        nombre,
        apellido,
        fechaNacimiento,
        documento,
        correo,
        direccion,
        fechaIngreso,
        departamento,
        puesto,
        usuario,
        clave,
      ])
      return 'Empleado creado'
    } catch (e) {
      throw new Error('Error al crear un empleado.')
    }
  }

  static async updateEmployeeById({ id, input }) {
    const {
      nombre,
      apellido,
      documento,
      correo,
      direccion,
      departamento,
      puesto,
      estado,
    } = input
    try {
      const [employees] = await connection.query(
        'CALL usp_ModificarEmpleado(?,?,?,?,?,?,?,?,?);',
        [
          id,
          nombre,
          apellido,
          documento,
          correo,
          direccion,
          departamento,
          puesto,
          estado,
        ],
      )
      return 'Empleado modificado'
    } catch (e) {
      throw new Error('Error al modificar empleado')
    }
  }

  static async deleteEmployeeById({ id }) {
    try {
      await connection.query('CALL usp_BajaEmpleado(?);', [id])
      return 'Empleado desabilitado'
    } catch (e) {
      throw new Error('Empleado no encontrado')
    }
  }
}
