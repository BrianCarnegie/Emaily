//Modules Used
const mongoose = require('mongoose');

//Creating a Schema class
const { Schema } = mongoose;

//Creating our userSchema
const userSchema = new Schema({
    googleId: String 
});

//Turning our schema into a model or 'class'
mongoose.model('users', userSchema);

