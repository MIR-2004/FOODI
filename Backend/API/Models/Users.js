import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema model 
const userSchema = new Schema({
    name: String,
    email:{
        type: String,
        trim: true,
        minlength: 3,
    },
    photoURL: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// create model instance
const User = mongoose.model('User', userSchema);
export default User;