import mongoose from 'mongoose';

var elementSchema = mongoose.Schema({
    _id: String,
    name: String,
    body: String,
    user: String
})

const wikiListSchema = mongoose.Schema({
    _id: String,
    work: [elementSchema],
    evaluation: [elementSchema],
    result: [elementSchema]
});

//export default mongoose.model('WikiList', wikiListSchema);