export interface RoomInterface {
  _id?: string;

  roomNumber: string;
  roomType: string;
  description: string;
  offer: boolean;
  offerPrice?: number;
  price: number;
  discount: number;
  status: boolean;
  amenities: string[];
}

export interface RoomInterfaceSeed {
  roomNumber: string;
  roomType: string;
  description: string;
  offer: boolean;
  offerPrice?: number;
  price: number;
  discount: number;
  status: boolean;
  amenities: string[];
}
