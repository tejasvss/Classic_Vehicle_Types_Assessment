const Vehicle = require('../models/vehicleTypes.m');


const getAllVehicleTypes = async (req, res) => {

    try {

        let data = await Vehicle.find({});
        return res.status(200).send({ status: 1, message: "Data fetched successfully", data: data })

    }
    catch (e) {
        return res.status(500).send({ status: 0, message: e.message || "Data fetched failed", data: {} })
    }
}

module.exports = { getAllVehicleTypes };
