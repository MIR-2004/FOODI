const mongoose = require('mongoose')
const {Schema} = mongoose;

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
})

// createw a model instance
const User = mongoose.model('User', userSchema);
module.exports = User;