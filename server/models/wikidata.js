import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: String,
    name: String,
    body: String,
    user: String
});

export default mongoose.model('WikiDate', userSchema);