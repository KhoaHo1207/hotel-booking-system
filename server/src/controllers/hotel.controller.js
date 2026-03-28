import Hotel from "../models/Hotel.model.js";
import User from "../models/User.model.js";
import Room from "../models/Room.model.js";
import xss from "xss";
export const createHotel = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, address, contact, city } = req.body;

    if (!name || !address || !contact || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Hotel name must be at least 3 characters long",
      });
    }

    if (address.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Hotel address must be at least 10 characters long",
      });
    }

    if (contact.trim().length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Hotel contact must be exactly 10 characters long",
      });
    }

    if (city.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Hotel city must be at least 3 characters long",
      });
    }

    const hotel = await Hotel.findOne({ owner });

    if (hotel) {
      return res.status(400).json({
        success: false,
        message: "You already have a hotel",
      });
    }

    const newHotel = await Hotel.create({
      name: name.trim(),
      address: address.trim(),
      contact: contact.trim(),
      owner: owner,
      city: city.trim(),
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" }, { new: true });

    return res.status(201).json({
      success: true,
      message: "Registered as hotel owner successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getHotels = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [hotels, total] = await Promise.all([
      Hotel.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate({
        path: "owner",
        select: "-password",
      }),
      Hotel.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      data: hotels,
      meta: {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const hotel = await Hotel.findById(id).populate("owner", "-password");

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel fetched successfully",
      results: {
        hotel,
      },
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteHotel = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const owner = req.user._id;
    const { id } = req.params;

    if (!id) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const hotel = await Hotel.findById(id).session(session);

    if (!hotel) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    if (!hotel.owner.equals(owner)) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    await hotel.deleteOne({ session });

    await User.findByIdAndUpdate(
      owner,
      { role: "user" },
      { new: true, session }
    );

    await Room.deleteMany({ hotel: id }).session(session);

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } finally {
    session.endSession();
  }
};

export const updateHotel = async (req, res) => {
  try {
    const owner = req.user._id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const allowedFields = ["name", "address", "contact", "city"];
    const updates = {};

    for (const key of allowedFields) {
      const value = req.body[key];

      if (value === undefined) continue;

      if (typeof value === "string") {
        const cleaned = xss(value.trim());

        if (cleaned.length > 0) {
          updates[key] = cleaned;
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const hotel = await Hotel.findOneAndUpdate({ _id: id, owner }, updates, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
