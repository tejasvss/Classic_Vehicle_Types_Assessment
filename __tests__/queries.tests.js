const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
let { createApolloServer } = require('../server')




test("Check Application ", async () => {

    supertest(app).get("/")
        .expect(200)

});



