const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    aadharNo: { type: String, unique: true },
    metamask: { type: String, unique: true }
});