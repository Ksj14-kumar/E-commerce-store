class Helper {

    constructor() {
        this.message = ""
    }
    isValidInfo = (err) => {
        let errInstance = null;
        if ("email" in err.errors) {
            errInstance = err.errors.email.properties

            this.message = errInstance.message
        }
        if ("name" in err.errors) {
            errInstance = err.errors.name.properties
            this.message = errInstance.message
        }
        if ("lname" in err.errors) {
            errInstance = err.errors.lname.properties
            this.message = errInstance.message
        }
        if ("password" in err.errors) {
            errInstance = err.errors.password.properties
            this.message = errInstance.message
        }
        return this.message
    }
}

module.exports = new Helper()