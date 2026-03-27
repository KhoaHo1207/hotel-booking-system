import Room from "../models/Room.model.js";

export const createRoom = async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, images } = req.body;

    if (!hotel || !roomType || !pricePerNight || !amenities || !images) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (roomType.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Room type must be at least 3 characters long",
      });
    }

    if (pricePerNight <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price per night must be greater than 0",
      });
    }

    if (amenities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Amenities are required",
      });
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    const newRoom = await Room.create({
      hotel,
      roomType,
      pricePerNight,
      amenities,
      images,
      isAvailable: true,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel");

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      results: {
        rooms,
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

export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const room = await Room.findById(id).populate("hotel");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      results: {
        room,
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

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const allowedFields = [
      "roomType",
      "pricePerNight",
      "amenities",
      "images",
      "isAvailable",
    ];

    const updates = {};
    for (let key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const room = await Room.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      results: {
        room,
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
