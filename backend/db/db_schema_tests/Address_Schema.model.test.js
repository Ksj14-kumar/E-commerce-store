const AddressModel = require("../Address_Schema")
const mongoose = require("mongoose")
const USER = {
  name: "David",
  locality: "CA",
  pincode: "200045",
  address: "CA, USA",
  city: "C.A.",
  state: "C.A.",
  mobile: "03859348753",
  userId: "123456",
  active: true
}
describe('CRUD Operation on Address Schema', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  });

  afterAll(async () => {
    const result = await AddressModel.deleteMany({ userId: USER.userId })
    try {
      expect(result.deletedCount).toBe(1)
    } catch (err) {
      expect(result.deletedCount).toBe(0)
    }
    await mongoose.connection.close();
  });

  it('add new document', async () => {
    const newUser = new AddressModel(USER)
    let errInstance = null
    try {
      const result = await newUser.save()
      expect(result.userId).toBe(newUser.userId);
    } catch (err) {
      console.log(err)
      if ("name" in err.errors) {
        errInstance = err.errors.name.properties
        if (!newUser.name) {
          expect(errInstance.message).toBe("Path `name` is required.")
        }
        else {
          expect(errInstance.message).toBe("name only contains characters")
        }
        expect(errInstance.path).toBe("name")
        expect(errInstance.value).toBe(newUser.name)
      }
      else if ("pincode" in err.errors) {
        errInstance = err.errors.pincode.properties
        if (!newUser.pincode) {
          expect(errInstance.message).toBe("Path `pincode` is required.")
        } else {
          expect(errInstance.message).toBe("invalid pincode")
        }
        expect(errInstance.path).toBe("pincode")
      }
      else if ("locality" in err.errors) {
        errInstance = err.errors.pincode.properties
        if (!newUser.locality) {
          expect(errInstance.message).toBe("Path `pincode` is required.")
        }
        else {
          expect(errInstance.message).toBe("locality can't be empty")
        }
        expect(errInstance.path).toBe("locality")
      }
      else if ("address" in err.errors) {
        errInstance = err.errors.pincode.properties
        if (!newUser.address) {
          expect(errInstance.message).toBe("Path `address` is required.")
        }
        else {
          expect(errInstance.message).toBe("address can't be empty")
        }
        expect(errInstance.path).toBe("address")
      }
      else if ("city" in err.errors) {
        errInstance = err.errors.pincode.properties
        if (!newUser.city) {
          expect(errInstance.message).toBe("Path `city` is required.")
        }
        else {
          expect(errInstance.message).toBe("city can't be empty")
        }
        expect(errInstance.path).toBe("city")
      }
      else if ("state" in err.errors) {
        errInstance = err.errors.pincode.properties
        if(!newUser.state){
          expect(errInstance.message).toBe("Path `state` is required.")
        }
        else{
          expect(errInstance.message).toBe("state can't be empty")
        }
        expect(errInstance.path).toBe("state")
      }
      else if ("userId" in err.errors) {
        errInstance = err.errors.pincode.properties
        if(!newUser.userId){
          expect(errInstance.message).toBe("Path `userId` is required.")
        }
        else{
          expect(errInstance.message).toBe("userId can't be empty")
        }
        expect(errInstance.path).toBe("userId")
      }
    }
  });
  it("update document", async () => {
    const findUser = await AddressModel.findOneAndUpdate({ userId: USER.userId }, { name: "jason" }, { new: true })
    expect(findUser.name).toBe("jason");
    expect(findUser).not.toBeUndefined();
  })

  it("read document", async () => {
    const findUser = await AddressModel.findOne({ userId: USER.userId });
    expect(findUser.name).toBe("jason");
    expect(findUser).not.toBeUndefined();
  })

});