const mongoose = require('mongoose');


const vehicleTypeSchema = new mongoose.Schema({

    makeId: [{ type: String }],
    makeName: [{ type: String }],
    vehicleTypes: [{
        VehicleTypeId: [{ type: String }],
        VehicleTypeName: [{ type: String }]
    }]
}, { versionKey: false });

const VehicleTypes = new mongoose.model("vehicleTypes", vehicleTypeSchema);

module.exports = VehicleTypes;