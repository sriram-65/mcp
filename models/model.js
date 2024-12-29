const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: String,
    description: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resource', resourceSchema);
