export type User = {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: "user" | "admin" | "hotelOwner";
  isVerified: boolean;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
  recentSearchedCities: string[];
};

export type Hotel = {
  _id: string;
  name: string;
  address: string;
  contact: string;
  owner: User;
  city: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type RoomImage = {
  url: string;
  public_id: string;
};

export type Room = {
  _id: string;
  hotel: Hotel;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: RoomImage[];
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type ExclusiveOffer = {
  _id: number;
  title: string;
  description: string;
  priceOff: number;
  expiryDate: string;
  image: string;
};

export type Testimonial = {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
  review: string;
};

export type RoomCommon = {
  icon: string;
  title: string;
  description: string;
};

export type Booking = {
  _id: string;
  user: User;
  room: Room;
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  guests: number;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DashboardData = {
  totalBookings: number;
  totalRevenue: number;
  bookings: Booking[] | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  username: string;
};

export type APIResponseWithData<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
    stats?: {
      totalRevenue?: number;
    };
  };
};

export type APIResponseNoData = {
  success: boolean;
  message: string;
};

export type HotelRegistrationPayload = {
  name: string;
  address: string;
  contact: string;
  city: string;
};

export type AddRoomPayload = {
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: File[];
};

export type BookingPayload = {
  room: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
};
