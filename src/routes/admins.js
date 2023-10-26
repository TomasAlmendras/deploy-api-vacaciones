import { Router } from 'express'
import { AdminController } from '../controllers/admins.js'

export const createAdminRouter = ({ adminModel }) => {
  const adminRouter = Router()

  const adminController = new AdminController({ adminModel })

  adminRouter.get('/', adminController.getAllAdmin)
  adminRouter.post('/', adminController.createAdmin)
  adminRouter.post('/login', adminController.adminLogin)
  adminRouter.delete('/:id', adminController.deleteAdminById)
  adminRouter.patch('/:id', adminController.updateAdminById)

  return adminRouter
}
