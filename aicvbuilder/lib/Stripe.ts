import { env } from "@/env"
import Stripe from "stripe"

console.log("stripe sectret key" , env.STRIPE_SECRET_KEY)
const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export default stripe