'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var comment = new Schema({
    user: String,
    body: String
});

var elementSchema = new Schema({
    name: String,
    body: String,
    user: String,
    commentList: [comment]
});

var wikiListSchema = new Schema({
    practice: [elementSchema],
    evaluation: [elementSchema],
    history: [elementSchema],
    setting: [elementSchema],
    Operation: [elementSchema],
    inspection: [elementSchema],
    rule: [elementSchema]
});

exports.default = _mongoose2.default.model('WikiList', wikiListSchema);