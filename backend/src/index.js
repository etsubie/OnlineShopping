import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';


dotenv.config();

dbConnect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', authRouter)

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
