import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controller/roleController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const roleRoute = express.Router();

// Route to create a new Role
roleRoute.post(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  createRole
);

// Route to get all Roles
roleRoute.get(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  getAllRoles
);

// Route to update a Role
roleRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  updateRole
);

// Route to delete a Role
roleRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  deleteRole
);

export default roleRoute;
