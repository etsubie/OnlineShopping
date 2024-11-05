import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../model/roleModel.js';
import dbConnect from '../config/dbConnect.js';

dotenv.config();

// Define and Seed Roles
const seedRoles = async () => {
  await dbConnect();

  try {
    // Define the roles you want to seed
    const roles = [
      { name: 'Admin' },
      { name: 'Customer' },
      { name: 'DeliveryPersonnel' },
    ];

    // Delete existing roles
    await Role.deleteMany({});

    // Insert roles
    const roleDocs = await Role.insertMany(roles);
    console.log('Roles seeded:', roleDocs);
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    mongoose.connection.close(); 
  }
};

seedRoles(); 
