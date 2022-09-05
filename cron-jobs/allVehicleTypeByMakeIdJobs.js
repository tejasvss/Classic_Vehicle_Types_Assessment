const cron = require('node-cron');
const axios = require('axios');
const AllVehicleMakeIds = require('../models/vehicleMakeIds.m');
const VehicleTypes = require('../models/vehicleTypes.m')
const { parseStringPromise } = require('xml2js')


//This config is for converting XML toJSON with desired formats
const opts = {
    mergeAttrs: true,
    attrNameProcessors: [str => '@' + str],
    explicitArray: false
}


const runAllVehicleTypesWithMakeIdJobs = async () => {

    cron.schedule('* */24 * * *', async () => {

        console.log(' VehicleType cron Jobs are started');

        let makeIds = await AllVehicleMakeIds.find({});

        makeIds = JSON.parse(JSON.stringify(makeIds));

        console.log("MakeIds length", makeIds.length)

        async function fetchVehTypeData(mainData) {

            let data = mainData;

            //Iterating makeId's and fetching vehcileType Data by eachMAkeID
            const vdata = data.map(async id => {

                id.makeId = + id.makeId;
                const res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${id.makeId}?format=xml`); // Send request for each id
                let jsonData = await parseStringPromise(res.data, opts);
                let resp = {};
                resp.makeId = id.makeId;
                resp.makeName = id.makeName;
                resp.vehicleTypes = jsonData.Response.Results.VehicleTypesForMakeIds
                return resp;
            })

            const subscriptionData = await Promise.all(vdata);

            return subscriptionData
        }

        let typesData = await fetchVehTypeData(mainData);

        await VehicleTypes.deleteMany({}).then(async () => {

            await VehicleTypes.create(VVData)
        })

    });
}

module.exports = {
    runAllVehicleTypesWithMakeIdJobs
}
