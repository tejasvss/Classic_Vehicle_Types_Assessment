const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const { parseStringPromise } = require('xml2js')
const connectToDatabase = require('./config/db.Connection');
let Vehicle = require('./models/vehicleTypes.m');
let AllVehicleMakeIds = require('./models/vehicleMakeIds.m')
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs')
const typeDefs = fs.readFileSync('./graphql-apis/schema.graphql', { encoding: 'utf-8' })
const { resolvers } = require('./graphql-apis/resolvers')
const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 8080;
const app = express();


//Establishing Mongo Db database connection
connectToDatabase();

app.get('/', async (req, res) => {
    res.status(200).send("Welcome to Vehicle Assessment By Svssteja")
})

app.get('/test', async (req, res) => {
    res.status(200).send({
        status: 200,
        Message: "Working fine"
    })
})


//For Restful-API
app.use(require('./rest-apis/route'))


//For Graphql Server configurations
server.start().then(() => {
    server.applyMiddleware({
        app,
        cors: true,
    });
});



/*
This cronJobs run with time interval of 23 hours to fetch all vehicleMakeId's from XML and store in DB as JSON format.If u want to test this job just uncomment the below function
*/
// require('./cron-jobs/makesDataJobs').runMakesFileXmlJobs();


/*
This Job is used to fetch all the vehcileIds with makeId's..If u want to test this job just uncomment the below function
*/

// require('./cron-jobs/allVehicleTypeByMakeIdJobs').runAllVehicleTypesWithMakeIdJobs()






module.exports = app;
