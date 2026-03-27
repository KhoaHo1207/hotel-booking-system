import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
      minlength: [3, "Hotel name must be at least 3 characters long"],
    },
    address: {
      type: String,
      required: [true, "Hotel address is required"],
      trim: true,
      minlength: [10, "Hotel address must be at least 10 characters long"],
    },
    contact: {
      type: String,
      required: [true, "Hotel contact is required"],
      trim: true,
      length: [10, "Hotel contact must be exactly 10 characters long"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Hotel owner is required"],
    },
    city: {
      type: String,
      required: [true, "Hotel city is required"],
      trim: true,
      minlength: [3, "Hotel city must be at least 3 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
