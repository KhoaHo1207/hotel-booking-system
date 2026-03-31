import Booking from "../models/Booking.model.js";
import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";
export const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    const isAvailable = bookings.length === 0;

    return isAvailable;
  } catch (error) {
    console.log(error || "Internal Server Error");

    throw new Error(error.message || "Internal Server Error");
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    if (!room || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    return res.status(200).json({
      success: true,
      message: isAvailable ? "Room is available" : "Room is not available",
      data: isAvailable,
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const user = req.user;

    const { room, checkInDate, checkOutDate, guests } = req.body;

    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const guestsNumber = Number(guests);

    if (isNaN(guestsNumber) || guestsNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Guests must be at least 1",
      });
    }

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available",
      });
    }

    const roomData = await Room.findById(room).populate({
      path: "hotel",
      select: "name address city",
    });

    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn > checkOut) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: guestsNumber,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log(error || "Internal Server Error");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find({ user: user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "room",
          select: "roomType pricePerNight images",
        })
        .populate({
          path: "hotel",
          select: "name address city",
        }),
      Booking.countDocuments({ user: user._id }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
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

export const getHotelBookings = async (req, res) => {
  try {
    const owner = req.user._id;
    const hotel = await Hotel.findOne({
      owner,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find({ hotel: hotel._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("room hotel"),
      Booking.countDocuments({ hotel: hotel._id }),
    ]);

    const allBookings = await Booking.find({ hotel: hotel._id }).select(
      "totalPrice"
    );

    const totalRevenue = allBookings.reduce((acc, b) => acc + b.totalPrice, 0);

    return res.status(200).json({
      success: true,
      message: "Hotel bookings fetched successfully",
      data: bookings,
      meta: {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        stats: {
          totalRevenue,
        },
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
