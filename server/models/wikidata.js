import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var comment = new Schema({
    user: String,
    body: String
})

var elementSchema = new Schema({
    name: String,
    body: String,
    user: String,
    commentList: [comment]
})

const wikiListSchema = new Schema({
    practice: [elementSchema],
    evaluation: [elementSchema],
    history: [elementSchema],
    setting: [elementSchema],
    Operation: [elementSchema],
    inspection: [elementSchema],
    rule: [elementSchema]
});

export default mongoose.model('WikiList', wikiListSchema);