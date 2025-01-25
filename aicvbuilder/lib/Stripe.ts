import Stripe from "stripe"

console.log("stripe sectret key" , process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default stripe