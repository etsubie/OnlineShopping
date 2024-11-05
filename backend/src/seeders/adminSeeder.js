import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Role from '../model/roleModel.js';
import User from '../model/userModel.js';
import dbConnect from '../config/dbConnect.js';

dotenv.config();
dbConnect();

const CreateAdmin = async () => {
  try {
    // Check if the Admin role exists, or create it if it doesn't
    let AdminRole = await Role.findOne({ name: 'Admin' });
    if (!AdminRole) {
      AdminRole = new Role({ name: 'Admin' });
      await AdminRole.save();
      console.log("Admin role created");
    }

    const AdminData = {
      name: 'Admin',
      email: 'admin@email.com',
      role: AdminRole._id,
      password: await bcrypt.hash('1234', 10), // Hashing password
    };

    // Update the admin if they exist, or create a new one
    const Admin = await User.findOneAndUpdate(
      { email: 'admin@email.com' },
      AdminData,             // Update fields
      { new: true, upsert: true } // Options: create if not exists, return new doc
    );

    if (Admin) {
      console.log("Admin updated successfully");
    } else {
      console.log("Admin created successfully");
    }

  } catch (error) {
    console.error("Error in updating or creating admin:", error);
  } finally {
    mongoose.connection.close(); 
  }
};

CreateAdmin();
