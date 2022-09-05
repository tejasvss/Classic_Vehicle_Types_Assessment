const mongoose = require('mongoose');


const allVehicleSchema = new mongoose.Schema({

    makeId: { type: String },
    makeName: { type: String }
}, { versionKey: false });

const AllVehicleMakeIds = new mongoose.model("all_Vehicles_makeIds", allVehicleSchema);

module.exports = AllVehicleMakeIds;