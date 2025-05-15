const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    machineName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['available', 'lended', 'unavailable'],
        default: 'available',
    }
},
{
    timestamps: true,
});

const Machine = mongoose.model('Machine', machineSchema);
module.exports = Machine;