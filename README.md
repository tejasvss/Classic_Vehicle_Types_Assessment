STEPS TO RUN THE APPLICATION:

i)After unpackaging the zip folder install dependenices with command "npm i".
ii)After successfully installed dependencies to start the application command is "npm run start"
iii)To fetch all the combined data call the below api in graphql prtocol

api_type:
"GRAPHQL"

api_url:
http://localhost:8080/graphql

api_payload:
query{
    getAllVehicleTypes{
        makeId,
        makeName,
        vehicleTypes{
            VehicleTypeId,
            VehicleTypeName
        }
    }
}
api_method:
"POST"

Note:
Initially we designed two cron jobs:
i)This job is used to fetch all vehicle makeIds and storing in DB with interval of 23 hours.
ii)This job is used to fetch all vehicle typeIds with a particular makeId and storing in DB with interval of 24 hours.

As of now these two jobs are commented.To test the cron jobs just uncomment the jobs in server.js


