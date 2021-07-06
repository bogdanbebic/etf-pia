import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    role: {
        type: Number
    },
    active: {
        type: Boolean
    },
});

export default mongoose.model('Users', User, 'users');
