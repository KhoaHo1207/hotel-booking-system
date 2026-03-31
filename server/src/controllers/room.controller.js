import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";
import fs from "fs";
import mongoose from "mongoose";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.status(403).json({
        success: false,
        message: "You don't have a hotel",
      });
    }

    if (!roomType || !pricePerNight || !amenities) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanedRoomType = roomType.trim();
    if (cleanedRoomType.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Room type must be at least 3 characters long",
      });
    }

    const price = Number(pricePerNight);
    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Invalid price",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price per night must be greater than 0",
      });
    }

    if (!Array.isArray(amenities) || amenities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Amenities must be a non-empty array",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    const uploadedPublicIds = [];

    let images;
    try {
      const uploadImages = req.files.map(async (file) => {
        try {
          const response = await cloudinary.uploader.upload(file.path);

          uploadedPublicIds.push(response.public_id);

          return {
            url: response.secure_url,
            public_id: response.public_id,
          };
        } finally {
          fs.unlinkSync(file.path);
        }
      });

      images = await Promise.all(uploadImages);
    } catch (err) {
      await Promise.all(
        uploadedPublicIds.map((id) => cloudinary.uploader.destroy(id))
      );
      throw err;
    }

    const newRoom = await Room.create({
      hotel: hotel._id,
      roomType: cleanedRoomType,
      pricePerNight: price,
      amenities: amenities.map((a) => a.trim()),
      images,
      isAvailable: true,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [rooms, total] = await Promise.all([
      Room.find({ isAvailable: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "hotel",
          select: "name address city",
        }),
      Room.countDocuments({ isAvailable: true }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms,
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

export const getOwnerRooms = async (req, res) => {
  try {
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ owner });

    if (!hotel) {
      return res.status(403).json({
        success: false,
        message: "You don't have a hotel",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const rooms = await Room.find({ hotel: hotel._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms, //dữ liệu chính API trả về
      meta: {
        //pagination, total count, filter info, sort info, ...etc
        pagination: {
          page,
          limit,
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

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const hotel = await Hotel.findOne({ owner });

    const room = await Room.findOne({
      _id: id,
      hotel: hotel._id,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found or unauthorized",
      });
    }

    room.isAvailable = !room.isAvailable;

    await room.save();

    return res.status(200).json({
      success: true,
      message: "Room availability toggled successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const room = await Room.findById(id).populate({
      path: "hotel",
      select: "name address city owner",
      populate: {
        path: "owner",
        select: "username email image",
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      data: room,
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
