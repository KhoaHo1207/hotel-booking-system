export type User = {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: string;
  cretaedAt?: string;
  updatedAt: string;
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

export type Room = {
  _id: string;
  hotel: Hotel;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
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
