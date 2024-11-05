import Role from "../model/roleModel.js";

// Middleware to check user role
export const authorizeRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const { id } = req.user; 
      const userRole = await Role.findOne({ name: roleName });

      if (!userRole) {
        return res.status(404).json({ message: 'Role not found' });
      }

      // Check if user has the required role
      if (req.user.role !== userRole.name) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Error in role authorization:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
