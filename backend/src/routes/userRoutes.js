import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { createUser, deleteUser, getUsers, updateUser } from '../controller/userController.js';


const userRoute = express.Router();

// Route to create a new Role
userRoute.post(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  createUser
);

// Route to get all Roles
userRoute.get(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  getUsers
);

// Route to update a Role
userRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  updateUser
);

// Route to delete a Role
userRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  deleteUser
);

export default userRoute;
