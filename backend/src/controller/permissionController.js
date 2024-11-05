import Permission from "../model/permissionModel.js";
import Role from "../model/roleModel.js";

// Create a new permission
export const createPermission = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Permission name is required" });
    }

    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    const newPermission = new Permission({ name });
    await newPermission.save();

    return res.status(201).json({ message: "Permission created successfully", permission: newPermission });
  } catch (error) {
    console.error("Error creating permission:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all permissions
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    return res.status(200).json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a permission
export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Permission name is required" });
    }

    const updatedPermission = await Permission.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    return res.status(200).json({ message: "Permission updated successfully", permission: updatedPermission });
  } catch (error) {
    console.error("Error updating permission:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a permission
export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPermission = await Permission.findByIdAndDelete(id);
    if (!deletedPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    return res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    console.error("Error deleting permission:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Assign permission to a role
export const assignPermissionToRole = async (req, res) => {
    try {
      const { roleName, permissionName } = req.body;
  
      if (!roleName || !permissionName) {
        return res.status(400).json({ message: "Role name and Permission name are required" });
      }
  
      // Find the role by name
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      // Find the permission by name
      const permission = await Permission.findOne({ name: permissionName });
      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }
  
      // Check if permission is already assigned to the role
      if (role.permissions.includes(permission._id)) {
        return res.status(400).json({ message: "Permission already assigned to this role" });
      }
  
      // Assign permission ID to role
      role.permissions.push(permission._id);
      await role.save();
  
      return res.status(200).json({ message: "Permission assigned to role successfully", role });
    } catch (error) {
      console.error("Error assigning permission to role:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
