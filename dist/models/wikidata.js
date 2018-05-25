'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comment = _mongoose2.default.Schema({
    user: String,
    body: String
});

var elementSchema = _mongoose2.default.Schema({
    _id: String,
    name: String,
    body: String,
    user: String,
    commentList: [comment]
});

var wikiListSchema = _mongoose2.default.Schema({
    _id: String,
    work: [elementSchema],
    evaluation: [elementSchema],
    result: [elementSchema]
});

exports.default = _mongoose2.default.model('WikiList', wikiListSchema);