import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Simple email validation
    },
    password: {
        type: String,
        required: true,
    },
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
},{timestamps: true});

// Create a User model
const User = mongoose.model('User', userSchema);


export default User