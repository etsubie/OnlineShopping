import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { assignPermissionToRole, createPermission, deletePermission, getPermissions, updatePermission } from '../controller/permissionController.js';

const permissionRoute = express.Router();

// Route to create a new Permission
permissionRoute.post(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  createPermission
);

// Route to get all Permissions
permissionRoute.get(
  '/',
  verifyToken,
  authorizeRole('Admin'),
  getPermissions
);

// Route to update a Permission
permissionRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  updatePermission
);

// Route to delete a Permission
permissionRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('Admin'),
  deletePermission
);
// Route to assign a Permission to role
permissionRoute.post(
    '/assign',
    verifyToken,
    authorizeRole('Admin'),
    assignPermissionToRole
  );

export default permissionRoute;
