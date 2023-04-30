const Items = require("../Item_Schema")
const mongoose = require("mongoose")
const newItem = {
    userId: "8955",
    items: {
        id: 21,
        title: "Black T-Shirt mans",
        price: 300,
        description: "mans t-shirt's",
        category: "mans",
        image: "image url",
        rating: { rate: 4.5, count: 2 },
        count: 2
    },
    totalItems: 2,
    totalAmount: 600
}
describe("Item product schema test", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        const deleteItems = await Items.deleteMany({ userId: newItem.userId })
        try {
            expect(deleteItems.deletedCount).toBe(1)
        } catch (err) {
            expect(deleteItems.deletedCount).toBe(0)
        }
        mongoose.connection.close()
    })
    it("add new item", async () => {
        const addedItem = await new Items(newItem)
        try {
            const result = await addedItem.save()
            expect(result.userId).toBe(newItem.userId)
            expect(result).not.toBeUndefined()
        } catch (err) {
            if ("userId" in err.errors) {
                const errInstance = err.errors.userId.properties
                if (!newItem.userId) {
                    expect(errInstance.message).toBe("Path `userId` is required.")
                }
                else {
                    expect(errInstance.message).toBe("userId can't be empty")
                }
                expect(errInstance.path).toBe("userId")
            }
        }
    })

    it("read all items", async () => {
        const allItems = await Items.findOne({ userId: newItem.userId })
        expect(allItems.userId).toBe(newItem.userId)
        expect(allItems).not.toBeUndefined()
    })
})