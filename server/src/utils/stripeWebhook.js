import Stripe from "stripe";
import { ENV } from "../config/env.js";
import Booking from "../models/Booking.model.js";
//API to handle Stripe Webhooks
export const stripeWebhooks = async (req, res) => {
  //Stripe Date Initialize
  const stripeInstance = new Stripe(ENV.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      ENV.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }

  if (event.type === "checkout.session.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentid = paymentIntent.id;
    //Getting Session Metadata
    const sessions = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentid,
    });

    const { bookingId } = sessions.data[0].metadata;

    //Mark Payment as Paid
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: "Stripe",
    });
  } else {
    console.log("Unhandled event type", event.type);
  }
  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};
