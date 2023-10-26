import z from 'zod'

const adminSchema = z.object({
  nombre: z.string().min(2).max(50),
  apellido: z.string().min(2).max(50),
  correo: z.string(),
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

export function validateAdmin(input) {
  return adminSchema.safeParse(input)
}

export function validatePartialAdmin(input) {
  return adminSchema.partial().safeParse(input)
}
