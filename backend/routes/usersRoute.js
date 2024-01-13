import express from "express"
import {
  authUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getUserByID,
} from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post(`/login`, authUser)
router.post('/register', registerUser)
router.post(`/logout`, logoutUser)
// Add this in your routes file
router.post('/forgotpassword', forgotPassword);
router
  .put('/resetpassword/:resetToken', resetPassword)
  .route(`/:id`)
  .get(protect, getUserByID)
  

export default router