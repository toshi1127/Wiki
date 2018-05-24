import mongoose from 'mongoose';

var comment = mongoose.Schema({
    user: String,
    body: String
})

var elementSchema = mongoose.Schema({
    _id: String,
    name: String,
    body: String,
    user: String,
    commentList: [comment]
})

const wikiListSchema = mongoose.Schema({
    _id: String,
    work: [elementSchema],
    evaluation: [elementSchema],
    result: [elementSchema]
});

export default mongoose.model('WikiList', wikiListSchema);