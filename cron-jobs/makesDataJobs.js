const cron = require('node-cron');
const axios = require('axios');
const AllVehicleMakeIds = require('../models/vehicleMakeIds.m');
const { parseStringPromise } = require('xml2js')

const opts = {
    mergeAttrs: true,
    attrNameProcessors: [str => '@' + str],
    explicitArray: false
}


const runMakesFileXmlJobs = () => {
    cron.schedule('* */23 * * *', async () => {
        console.log(' Xml Jobs are started');
        const url = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML"
        let xmlData = await axios.get(url);
        let jsonData = await parseStringPromise(xmlData.data, opts);
        let mainData = jsonData.Response.Results.AllVehicleMakes;
        if (mainData.length) {
            const keysNameConversion = mainData.map(({
                Make_ID: makeId,
                Make_Name: makeName
            }) => ({
                makeId,
                makeName
            }));

            await AllVehicleMakeIds.deleteMany().then(async () => {
                await AllVehicleMakeIds.create(keysNameConversion)
            })
            console.log('Xml jobs are ended');
        }
    });
}

module.exports = {
    runMakesFileXmlJobs
}
