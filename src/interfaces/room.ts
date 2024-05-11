export interface Room {
  room: RoomClass;
  roomType: string;
  amenities: string[];
  price: number;
  offer: number;
  status: boolean;
}

export interface RoomClass {
  image: string;
  number: string;
  id: string;
}
