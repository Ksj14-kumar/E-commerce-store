const { default: mongoose } = require("mongoose")
const User = require("../UserSchema")
const userInfo = {
    lname: "warner",
    name: "David",
    verify: false,
    password: "x~bLbzC4(JbQVBEE",
    email: "abc@gmail.com",
    image: "image url",
    provider: "self"
}
describe("user schema test for user information", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        const deletedUser = await User.deleteMany()
        try {
            expect(deletedUser.deletedCount).toBe(1)
        } catch (err) {
            expect(deletedUser.deletedCount).toBe(0)
        }
        await mongoose.connection.close()
    })
    it("add user info", async () => {
        const newUser = await User(userInfo)
        try {
            const result = await newUser.save()
            expect({
                name: result.name,
                lname: result.lname,
                email: result.email,
                password: result.password,
                verify: result.verify,
                image: result.image,
                provider: result.provider
            }).toStrictEqual(userInfo)
        } catch (err) {
            console.log(err)
            if ("email" in err.errors) {
                const errInstance = err.errors.email.properties
                if (userInfo.email) {
                    expect(errInstance.message).toBe("provide valid email")
                }
                else {
                    expect(errInstance.message).toBe("Path `email` is required.")
                }
                expect(errInstance.path).toBe("email")
                expect(errInstance.value).toBe(userInfo.email)
            }
            if ("name" in err.errors) {
                const errInstance = err.errors.name.properties
                if (userInfo.name) {
                    expect(errInstance.message).toBe("provide valid name")
                }
                else {
                    expect(errInstance.message).toBe("Path `name` is required.")
                }
                expect(errInstance.path).toBe("name")
                expect(errInstance.value).toBe(userInfo.name)
            }
            if ("lname" in err.errors) {
                const errInstance = err.errors.lname.properties
                if (!userInfo.lname) {
                    expect(errInstance.message).toBe("Path `lname` is required.")
                }
                else {
                    expect(errInstance.message).toBe("provide last name")
                }
                expect(errInstance.path).toBe("lname")
                expect(errInstance.value).toBe(userInfo.lname)
            }
            if ("password" in err.errors) {
                const errInstance = err.errors.password.properties
                if (userInfo.password) {
                    expect(errInstance.message).toBe("provide valid password")
                }
                else {
                    expect(errInstance.message).toBe("Path `password` is required.")
                }
                expect(errInstance.path).toBe("password")
                expect(errInstance.value).toBe(userInfo.password)
            }
        }
    })

    it("get user", async () => {
        const userFromDB = await User.findOne({ email: userInfo.email })
        expect({
            name: userFromDB.name,
            lname: userFromDB.lname,
            email: userFromDB.email,
            password: userFromDB.password,
            verify: userFromDB.verify,
            image: userFromDB.image,
            provider: userFromDB.provider

        }).toStrictEqual(userInfo)
    })
    it("update user", async () => {
        const userfind = await User.findOneAndUpdate({ email: userInfo.email }, { name: "alise", lname: "morgan" }, { new: true })
        expect(userfind.name).toBe("alise")
        expect(userfind.lname).toBe("morgan")
    })
})