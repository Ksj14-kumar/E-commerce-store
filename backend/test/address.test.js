// TODO:Writing test cases-----
const address = require("../routers/addresses")
const supertest = require("supertest")
const { server } = require("../index")
const { default: mongoose } = require("mongoose")


// TODO:remove password
const request = supertest(server)
const login = () => {
    return request
        .post("/api/v1/user/login")
        .send({
            "email": "xyz@gmail.com",
            "password": "*"
        })
}


describe("address routes", () => {
    it("simple", () => {
        expect(3).toBe(3)
    })
})