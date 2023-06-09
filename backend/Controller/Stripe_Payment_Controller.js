const Item = require("../db/Item_Schema")
const FormatItems = require("../Services/Stripe_Items")
const { Stripe_Payment } = require("../Config/Stripe.Config")
const { SaveOrderInDBAfterSuccessPayment } = require('../util/OrderShema_Operations');
const stripe = require('stripe')(process.env.STRIPE_SECRET,{
    apiVersion: '2020-08-27',
});
class Payment {
    async checkout_session(req, res) {
        try {
            const userId = req.body.userId
            const getAllCurrentUserIdItems = await Item.findOne({ userId }).exec()
            const [formatListItem, shipAddress] = FormatItems(getAllCurrentUserIdItems.items, getAllCurrentUserIdItems.totalItems)
            console.log({ formatListItem })
            if (formatListItem?.length > 0) {
                const session = await Stripe_Payment(stripe, formatListItem, shipAddress, userId, getAllCurrentUserIdItems.items)
                console.log({ session })
                res.status(200).send(session.url);
            }
        } catch (err) {
            console.log(err)
            return res.status(500).send("something error occured")
        }
    }
    async WebHook(req, res) {
        const endpointSecret = process.env.STRIPE_END_POINT_SECRET
        const sig = req.headers['stripe-signature'];
        const payload = req.body
        console.log("webhook")
        console.log(req.rawBody)
        let data, eventType;
        let event;
        try {
            console.log({ endpointSecret })
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
            console.log({ event })
        } catch (err) {
            console.log(err.message)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object
        eventType = event.type
        console.log({ eventType })
        if (eventType === "checkout.session.completed") {
            try {
                const accessCustomerMetaData = await stripe.customers.retrieve(data.customer)
                const result = await SaveOrderInDBAfterSuccessPayment(accessCustomerMetaData, data)
                console.log("stripe checkoutsession complete")
                console.log({ result })
                if (result) {
                    res.status(200).send("success")
                }
            } catch (err) {
                console.log(err)
                return
            }
        }
        res.status(200).end()
    }
}
module.exports = new Payment()