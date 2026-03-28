import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room is required"],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel is required"],
    },
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checKOutDate: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be greater than 0"],
    },
    guests: {
      type: Number,
      required: [true, "Guests are required"],
      min: [1, "Guests must be at least 1"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "Pay At Hotel"],
      default: "Pay At Hotel",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
