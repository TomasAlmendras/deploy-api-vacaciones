import z from 'zod'

const employeeSchema = z.object({
  nombre: z.string().min(2).max(50),
  apellido: z.string().min(2).max(50),
  fechaNacimiento: z.date(),
  documento: z.string().max(8),
  correo: z.string().email().max(50),
  direccion: z.string().min(4).max(100),
  fechaIngreso: z.date(),
  departamento: z.string().min(5).max(50),
  puesto: z.string().min(5).max(50),
  usuario: z.string().min(2).max(50),
  clave: z.string().min(1),
  estado: z
    .custom((value) => {
      const lowerCaseValue = value.toLowerCase()
      if (lowerCaseValue === 'activo' || lowerCaseValue === 'inactivo') {
        return lowerCaseValue
      }
    })
    .default('Activo'),
})

export function validateEmployee(input) {
  return employeeSchema.safeParse(input)
}

export function validatePartialEmployee(input) {
  return employeeSchema.partial().safeParse(input)
}
