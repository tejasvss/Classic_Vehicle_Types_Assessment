const app = require('./server');

const port = process.env.PORT || 8080;

//To start our backend applications
app.listen(port, () => {
    console.log("*******************************************")
    console.log(`Server started successfully on port ${port}`)
    console.log(`GraphQL endpoint and playground accessible at http://localhost:${port}/graphql`)
})
