const { gql } = require('apollo-server-express');
const Vehicle = require('../models/vehicleTypes.m');


const resolvers = {
    Query: {
        getAllVehicleTypes: async () => {
            const data = await Vehicle.find({}).select('-_id')

            return data;
        }
    }
}


module.exports = { resolvers }