const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lendingSchema = new Schema({
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machine',
        required: true,
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'canceled'],
        default: 'active',
    },
},
{
    timestamps: true,
});

const Lending = mongoose.model('Lending', lendingSchema);
module.exports = Lending;