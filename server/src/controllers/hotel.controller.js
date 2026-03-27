import Hotel from "../models/Hotel.model.js";
import User from "../models/User.model.js";

export const createHotel = async (req, res) => {
  try {
    const { name, address, contact, city, owner } = req.body;

    if (!name || !address || !contact || !city || !owner) {
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

    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Hotel owner is required",
      });
    }

    const ownerUser = await User.findById(owner);

    if (!ownerUser) {
      return res.status(404).json({
        success: false,
        message: "Hotel owner not found",
      });
    }

    const newHotel = await Hotel.create({
      name: name.trim(),
      address: address.trim(),
      contact: contact.trim(),
      owner: owner,
      city: city.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
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
    const hotels = await Hotel.find().populate("owner", "-password");

    return res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      results: {
        hotels,
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
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return req.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const allowedFields = ["name", "address", "contact", "city"];

    const updates = {};

    for (let key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const hotel = await Hotel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
