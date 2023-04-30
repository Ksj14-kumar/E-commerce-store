const { default: mongoose } = require("mongoose")
const mobileOTP = require("../Mobile_OTP_Schema")
const newOTP = {
    mobile: "64681584687",
    userId: "990",
    otp: 4568,
    createdAt: new Date().getTime(),
    expireAt: new Date().getTime() + 150000,
    verify: false
}
describe("mobile otp schema", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        const deletedOTP = await mobileOTP.deleteMany()
        expect(deletedOTP.deletedCount).toBe(1)
        await mongoose.connection.close()
    })

    it("add otp", async () => {
        const addedOTP = await new mobileOTP(newOTP)
        try {
            const result = await addedOTP.save()
            expect(result.userId).toBe(newOTP.userId)
        } catch (err) {
            if ("otp" in err.errors) {
                const errInstance = err.errors.otp.properties
                if (!newOTP.otp) {
                    expect(errInstance.message).toBe('Path `otp` is required.')
                }
                else {
                    expect(errInstance.message).toBe('invalid OTP, Please enter 4 digits OTP.')
                }
                expect(errInstance.path).toBe("otp")
                expect(errInstance.value).toBe(newOTP.otp)
            }
            else if ("userId" in err.errors) {
                const errInstance = err.errors.otp.properties
                if (!newOTP.userId) {
                    expect(errInstance.message).toBe("Path `userId` is required.")

                } else {
                    expect(errInstance.message).toBe("userId can't be empty.")

                }
                expect(errInstance.path).toBe("userId")
                expect(errInstance.value).toBe(newOTP.userId)
            }
            else if ("mobile" in err.errors) {
                const errInstance = err.errors.otp.properties
                if (!newOTP.mobile) {
                    expect(errInstance.message).toBe("Path `mobile` is required.")

                }
                else {
                    expect(errInstance.message).toBe("mobile can't be empty.")
                }
                expect(errInstance.path).toBe("mobile")
                expect(errInstance.value).toBe(newOTP.mobile)
            }
            else if ("expireAt" in err.errors) {
                const errInstance = err.errors.otp.properties
                if (!newOTP.expireAt) {
                    expect(errInstance.message).toBe("Path `expireAt` is required.")
                }
                else {
                    expect(errInstance.message).toBe("userId can't be empty.")
                }
                expect(errInstance.path).toBe("expireAt")
                expect(errInstance.value).toBe(newOTP.expireAt)
            }
            else if ("createdAt" in err.errors) {
                const errInstance = err.errors.otp.properties
                if (!newOTP.createdAt) {
                    expect(errInstance.message).toBe("Path `createdAt` is required.")
                }
                else {
                    expect(errInstance.message).toBe("invalid created date.")
                }
                expect(errInstance.path).toBe("createdAt")
                expect(errInstance.value).toBe(newOTP.createdAt)
            }
        }
    })

    it("get opt", async () => {
        const otpFromDb = await mobileOTP.findOne({ userId: newOTP.userId })
        expect(otpFromDb.otp).toBe(newOTP.otp)
    })
})