import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        maxlength: 50,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    passwordHash: {  
        type: String, 
        required: true,
        minlength: 6
    },
    role: {  
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
{timestamps: true}
)

const User = mongoose.model('User', userSchema);

export default User;

