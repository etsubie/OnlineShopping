import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';
import roleRoute from './routes/roleRoutes.js';
import permissionRoute from './routes/permissionRoutes.js';
import userRoute from './routes/userRoutes.js';


dotenv.config();

dbConnect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', authRouter);
app.use('/api/roles', roleRoute);
app.use('/api/permissions', permissionRoute);
app.use('/api/users', userRoute);

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
